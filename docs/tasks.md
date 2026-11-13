# Tasks

## Review remaining API image findings

- [ ] Refresh the scan of the deployed API digest and review its high Debian
  package findings for upstream fixes and reachable runtime issues. The
  9 November 2026 baseline reported 46 high Debian entries, no available fixes
  for those entries and zero high or critical Node package entries. Counts
  must be refreshed before choosing remediation.

  The deployed dependency remediation uses Apollo Server 5 and Prisma 7.
  Verify image scanning, GraphQL, authentication, nutrition and activity queries
  for any update. Retain full scan reports and record the affected package
  versions, available fixes, applicability, owner and next review date.

  Owner: VitaTrack maintainer. The shared PostgreSQL image and database network
  belong to the infrastructure backlog. Track changes to this API image here.
  [Baseline production scan](https://github.com/PerrySmithMoss/VitaTrack/actions/runs/42699835207) ·
  [Infrastructure tasks](https://github.com/PerrySmithMoss/perry-infra/blob/main/docs/tasks.md)

  Done when the refreshed findings are patched or explicitly accepted with
  applicability evidence, mitigations and a review date, and any changed image
  is verified in production.
