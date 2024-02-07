import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';

import { readFile, readFileSync } from 'fs';

export class WorkshopCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "VlogVpc", {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16')
    })

    const webServer1 = new ec2.Instance(this, "WordpressServer1", {
      vpc,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.SMALL),
      machineImage: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      vpcSubnets: {subnetType: ec2.SubnetType.PUBLIC},
    });

    const script = readFileSync("./lib/resources/user-data.sh", "utf8");
    webServer1.addUserData(script);

    webServer1.connections.allowFromAnyIpv4(ec2.Port.tcp(80));

    const rdsServer = new rds.DatabaseInstance(this, "WordpressDB", {
      vpc,
      engine: rds.DatabaseInstanceEngine.mysql({version: rds.MysqlEngineVersion.VER_8_0_32}),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.SMALL),
      databaseName: "wordpress",
    });
    rdsServer.connections.allowDefaultPortFrom(webServer1);

    new CfnOutput(this, "WordpressServer1PublicIpAddress", {
      value: `http://${webServer1.instance.attrPublicIp}`,
    })
  }
}
