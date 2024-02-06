#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { WorkshopCdkStack } from '../lib/workshop_cdk-stack';

const app = new cdk.App();
new WorkshopCdkStack(app, 'WorkshopCdkStack');
