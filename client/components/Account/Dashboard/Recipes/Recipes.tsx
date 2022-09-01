import React from 'react';
import { Button } from '../../../Button/Button';

interface RecipesProps {}

export const Recipes: React.FC<RecipesProps> = ({}) => {
  return (
    <section className="col-span-12 lg:col-span-7">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-[#2b3042]">Recipes</h3>
        </div>
        <div>
          {/* <Button text='View all'/> */}
          <button className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded">
            View all
          </button>
        </div>
      </div>
      <div className="overflow-x-auto relative mt-5">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-sm text-gray-500">
            <tr>
              <th scope="col" className="py-3 pr-6 pl-3">
                Name
              </th>
              <th scope="col" className="py-3 pr-6 text-center">
                Protein
              </th>
              <th scope="col" className="py-3 pr-6  text-center">
                Fat
              </th>
              <th scope="col" className="py-3 pr-6  text-center">
                Carb
              </th>
              <th scope="col" className="py-3 pr-6  text-center">
                Calories
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-[#fafafa] my-4">
              <th
                scope="row"
                className="py-4 w-1/2 pl-3 font-bold pr-6 whitespace-nowrap"
              >
                Steak n' Eggs
              </th>
              <td className="py-4 my-2 pr-6  text-center">47(g)</td>
              <td className="py-4 pr-6  text-center">16.8(g)</td>
              <td className="py-4 pr-6  text-center">1.6(g)</td>
              <td className="py-4 pr-6  text-center">371</td>
            </tr>
            <tr>
              <td className="py-1.5"></td>
            </tr>
            <tr className="bg-[#fafafa] my-4">
              <th
                scope="row"
                className="py-4 w-1/2 pl-3 font-bold pr-6 whitespace-nowrap"
              >
                Steak n' Eggs
              </th>
              <td className="py-4 my-2 pr-6  text-center">47(g)</td>
              <td className="py-4 pr-6  text-center">16.8(g)</td>
              <td className="py-4 pr-6  text-center">1.6(g)</td>
              <td className="py-4 pr-6  text-center">371</td>
            </tr>
            <tr>
              <td className="py-1.5"></td>
            </tr>
            <tr className="bg-[#fafafa] my-4">
              <th
                scope="row"
                className="py-4 w-1/2 pl-3 font-bold pr-6 whitespace-nowrap"
              >
                Steak n' Eggs
              </th>
              <td className="py-4 my-2 pr-6  text-center">47(g)</td>
              <td className="py-4 pr-6  text-center">16.8(g)</td>
              <td className="py-4 pr-6  text-center">1.6(g)</td>
              <td className="py-4 pr-6  text-center">371</td>
            </tr>
            <tr>
              <td className="py-1.5"></td>
            </tr>
            <tr className="bg-[#fafafa] my-4">
              <th
                scope="row"
                className="py-4 w-1/2 pl-3 font-bold pr-6 whitespace-nowrap"
              >
                Steak n' Eggs
              </th>
              <td className="py-4 my-2 pr-6  text-center">47(g)</td>
              <td className="py-4 pr-6  text-center">16.8(g)</td>
              <td className="py-4 pr-6  text-center">1.6(g)</td>
              <td className="py-4 pr-6  text-center">371</td>
            </tr>
            <tr>
              <td className="py-1.5"></td>
            </tr>
            <tr className="bg-[#fafafa] my-4">
              <th
                scope="row"
                className="py-4 w-1/2 pl-3 font-bold pr-6 whitespace-nowrap"
              >
                Steak n' Eggs
              </th>
              <td className="py-4 my-2 pr-6  text-center">47(g)</td>
              <td className="py-4 pr-6  text-center">16.8(g)</td>
              <td className="py-4 pr-6  text-center">1.6(g)</td>
              <td className="py-4 pr-6  text-center">371</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};
