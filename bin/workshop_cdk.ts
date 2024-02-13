#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { LambdaLayerCdkStack } from "../lib/lambda_layer_cdk-stack";
import { WorkshopCdkStack } from "../lib/workshop_cdk-stack";

const app = new cdk.App();
new WorkshopCdkStack(app, "WorkshopCdkStack");
new LambdaLayerCdkStack(app, "LambdaLayerCdkStack");
