import type { SSTConfig } from "sst";
import { Bucket, Cron, RemixSite, RDS } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "Overfitter",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const bucket = new Bucket(stack, "public");
      const rds = new RDS(stack, "Database", {
        engine: "postgresql11.13",
        defaultDatabaseName: "overfitter_database",
        // migrations: "path/to/migration/scripts",
      });
      const site = new RemixSite(stack, "site", {
        bind: [bucket],
      });
      // new Cron(stack, "cron", {
      //   schedule: "rate(1 minute)",
      //   job: {
      //     function: {
      //       bind: [bucket],
      //       handler: "functions/delete.handler",
      //     },
      //   },
      // });

      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
