# Terraform State Backup

Raw Terraform state files are not committed because they may contain secret
values such as Secrets Manager payloads, private key material, and provider
state marked sensitive.

Before deleting the S3 backend, the current dev state was copied from:

```text
s3://soel-cms-terraform-state/env:/dev/terraform.tfstate
```

Local backup file:

```text
terraform/tfstate-dev-backup-before-s3-delete-20260512-132758.json
```

Verification metadata:

```text
sha256: 8486846cc198c4cef7150a1ba6ebef53384cb932c3c26c9e48dfa04fec29c795
serial: 90
lineage: ac9e0747-2422-0ec9-9827-4ccfe9dfa1cb
terraform_version: 1.9.3
resource_count: 56
```

The same SHA-256 was verified against the file downloaded from S3 at
`/tmp/terraform-state-s3-current.json` during the cleanup session.
