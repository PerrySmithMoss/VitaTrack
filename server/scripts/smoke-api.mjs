import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';

const origin = process.env.SMOKE_API_ORIGIN ?? 'http://127.0.0.1:5500';
const id = process.env.SMOKE_ID ?? randomUUID();
const email = `release-smoke-${id}@example.invalid`;
const username = `smoke-${id}`;
const password = randomUUID();

async function graphql(query, variables = {}, cookie = '') {
  const response = await fetch(new URL('/graphql', origin), {
    method: 'POST',
    headers: { 'content-type': 'application/json', cookie },
    body: JSON.stringify({ query, variables }),
    signal: AbortSignal.timeout(10000),
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.errors, undefined, 'GraphQL request should succeed');
  return {
    data: body.data,
    cookie: response.headers.getSetCookie().map(value => value.split(';')[0]).join('; '),
  };
}

assert.equal((await graphql('{ __typename }')).data.__typename, 'Query');
const registration = await graphql(
  'mutation ($email: String!, $password: String!, $username: String!) { createUser(email: $email, password: $password, username: $username) { data { id } } }',
  { email, password, username },
);
const userId = registration.data.createUser.data?.id;
assert.ok(userId, 'test user registration');
const loginQuery = 'mutation ($email: String!, $password: String!) { loginUserWithEmailAndPassword(email: $email, password: $password) { data { id } errors { field } } }';
assert.ok((await graphql(loginQuery, { email, password: 'invalid' })).data.loginUserWithEmailAndPassword.errors?.length);
const login = await graphql(loginQuery, { email, password });
assert.equal(login.data.loginUserWithEmailAndPassword.data?.id, userId);
const profile = await graphql(
  '{ getCurrentUser { data { id } } getCurrentUsersNutrition { data { id } } getUsersWorkouts { data { id } } }',
  {}, login.cookie,
);
assert.equal(profile.data.getCurrentUser.data?.id, userId);
assert.deepEqual(profile.data.getCurrentUsersNutrition.data, []);
assert.deepEqual(profile.data.getUsersWorkouts.data, []);
console.log('GraphQL registration, sign-in, nutrition and activity reads passed');

if (process.env.SMOKE_FOOD_DATA_FIXTURE) {
  async function lookup(action, value, cookie = '') {
    const response = await fetch(new URL('/food-data', origin), {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie },
      body: JSON.stringify({ action, value }),
      signal: AbortSignal.timeout(10000),
    });
    return { status: response.status, data: await response.json() };
  }

  assert.equal((await lookup('search', 'banana')).status, 401);
  assert.equal((await lookup('search', 'banana', 'accessToken=forged')).status, 401);
  const match = { id: 2709224, name: 'Banana, raw' };
  assert.deepEqual(await lookup('search', 'banana', login.cookie), { status: 200, data: [match] });
  assert.deepEqual(await lookup('details', match.id, login.cookie), {
    status: 200,
    data: {
      ...match,
      portions: [{ name: 'g', grams: 1 }, { name: '1 banana', grams: 126 }],
      nutrientsPer100g: { calories: 89, protein: 1.09, fat: 0.33, carbohydrate: 22.84, sugar: 12.23, sodium: 1 },
    },
  });
  assert.deepEqual(await lookup('search', 'rate limit', login.cookie), {
    status: 502, data: { message: 'Food lookup is unavailable' },
  });
  console.log('Authenticated FoodData Central search, portions, nutrients, and provider errors passed');
}

const currentUserQuery = '{ getCurrentUser { data { id } } }';
const sessionCookies = Object.fromEntries(login.cookie.split('; ').map(cookie => cookie.split('=')));
for (const [cookie, use] of [['accessToken', 'access'], ['refreshToken', 'refresh']]) {
  const claims = JSON.parse(Buffer.from(sessionCookies[cookie].split('.')[1], 'base64url'));
  assert.equal(claims.tokenUse, use);
  assert.equal(claims.password, undefined);
}
const wrongToken = await graphql(currentUserQuery, {}, `accessToken=${sessionCookies.refreshToken}`);
assert.equal(wrongToken.data.getCurrentUser, null, 'refresh token cannot authenticate an API request');
const refreshed = await graphql(currentUserQuery, {}, `refreshToken=${sessionCookies.refreshToken}`);
assert.equal(refreshed.data.getCurrentUser.data.id, userId);
assert.match(refreshed.cookie, /^accessToken=/);

const otherEmail = `release-smoke-other-${id}@example.invalid`;
const otherRegistration = await graphql(
  'mutation ($email: String!, $password: String!, $username: String!) { createUser(email: $email, password: $password, username: $username) { data { id } } }',
  { email: otherEmail, password, username: `other-${username}` },
);
const otherUserId = otherRegistration.data.createUser.data?.id;
assert.ok(otherUserId);

const workoutInput = { name: 'Owner workout', time: new Date().toISOString() };
const createWorkout = `mutation ($name: String!, $time: String!) {
  createWorkout(name: $name, startTime: $time, endTime: $time,
    exercises: [{name: "Squat", category: "Legs", exerciseType: "Strength", strengthSets: [{}]}]) {
    data { id name exercises { id } }
  }
}`;
const ownerWorkout = (await graphql(createWorkout, workoutInput, login.cookie)).data.createWorkout.data;
const otherWorkout = (await graphql(createWorkout, workoutInput, otherRegistration.cookie)).data.createWorkout.data;
assert.ok(ownerWorkout?.exercises[0]?.id);
assert.ok(otherWorkout?.exercises[0]?.id);

const editWorkout = `mutation ($workout: Float!, $exercise: Int!, $time: String!, $name: String!) {
  editWorkout(workoutId: $workout, name: $name, startTime: $time, endTime: $time,
    exercises: [{id: $exercise, name: "Squat", category: "Legs", exerciseType: "Strength", strengthSets: [{}]}]) {
    data { id name }
    errors { field }
  }
}`;
const ownerIds = { workout: Number(ownerWorkout.id), exercise: Number(ownerWorkout.exercises[0].id), time: workoutInput.time, name: 'Edited' };
assert.equal((await graphql(editWorkout, ownerIds, login.cookie)).data.editWorkout.data.name, 'Edited');
assert.equal((await graphql(editWorkout, ownerIds, otherRegistration.cookie)).data.editWorkout.data, null);
const crossExercise = { ...ownerIds, exercise: Number(otherWorkout.exercises[0].id), name: 'Unauthorized edit' };
assert.equal((await graphql(editWorkout, crossExercise, login.cookie)).data.editWorkout.data, null);
const deletes = `mutation ($workout: Float!, $exercise: Float!) {
  deleteWorkout(workoutId: $workout)
  deleteExercise(exerciseId: $exercise)
}`;
assert.deepEqual(
  { ...(await graphql(deletes, ownerIds, otherRegistration.cookie)).data },
  { deleteWorkout: false, deleteExercise: false },
);
const ownerWorkouts = await graphql('{ getUsersWorkouts { data { id name exercises { id } } } }', {}, login.cookie);
assert.deepEqual(ownerWorkouts.data.getUsersWorkouts.data, [{ ...ownerWorkout, name: 'Edited' }]);

const nutritionMutation = `mutation ($date: DateTime!) {
  addNutritionWithFoods(foods: [], nutritionInput: {date: $date}) {
    data { id userId }
    errors { field }
  }
}`;
const date = new Date().toISOString();
const ownerNutrition = (await graphql(nutritionMutation, { date }, login.cookie)).data.addNutritionWithFoods.data;
const otherNutrition = (await graphql(nutritionMutation, { date }, otherRegistration.cookie)).data.addNutritionWithFoods.data;
assert.equal(ownerNutrition?.userId, userId);
assert.equal(otherNutrition?.userId, otherUserId);
assert.notEqual(ownerNutrition.id, otherNutrition.id);

const addFood = `mutation ($nutrition: Int!, $date: DateTime!) {
  addFood(nutritionId: $nutrition, date: $date, foodInput: {
    name: "Test food", mealName: "Breakfast", numOfServings: 1, servingSize: "1 portion",
    calories: 1, protein: 0, fat: 0, carbohydrate: 0, sugar: 0, sodium: 0
  }) { data { id nutritionId } errors { field } }
}`;
const foodInput = { nutrition: Number(ownerNutrition.id), date };
assert.ok((await graphql(addFood, foodInput, login.cookie)).data.addFood.data?.id);
assert.equal((await graphql(addFood, foodInput, otherRegistration.cookie)).data.addFood.data, null);
console.log('Token separation and workout, exercise, and nutrition ownership checks passed');
