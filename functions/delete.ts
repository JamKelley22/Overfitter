import {
  DeleteObjectCommand,
  ListObjectsCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Bucket } from "aws-cdk-lib/aws-s3";

export async function handler() {
  const client = new S3Client({});

  const list = await client.send(
    new ListObjectsCommand({
      Bucket: (Bucket as unknown as any).public.bucketName,
    })
  );

  await Promise.all(
    (list.Contents || []).map((file) =>
      client.send(
        new DeleteObjectCommand({
          Key: file.Key,
          Bucket: (Bucket as unknown as any).public.bucketName,
        })
      )
    )
  );
}
