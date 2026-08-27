

🏠 [Main Site](https://motasem-notes.net/) · [🛒 Store](https://shop.motasem-notes.net/) · [▶ YouTube](https://www.youtube.com/@MotasemHamdan) · [☕ Membership](https://buymeacoffee.com/notescatalog/membership)

> Practitioner-grade cybersecurity notes, cert prep guides, and courses. All premium notes available at **[buymeacoffee.com/notescatalog/extras](https://buymeacoffee.com/notescatalog/extras)** or [shop.motasem-notes.net](https://shop.motasem-notes.net)


## Format and Validate Terraform code

|Command|Description|
|:-:|---|
|`terraform fmt`|Format code per HCL canonical standard|
|`terraform validate`|Validate code for syntax|
|`terraform validate -backend=false`|Validate code skip backend|

## Initialize your Terraform working directory

|Command|Description|
|:-:|---|
|`terraform init`|Initialize directory, pull down providers|
|`terraform init -get-plugins=false`|Initialize directory, do not download plugins|
|`terraform init -verify-plugins=false`|Initialize directory, do not verify plugins for Hashicorp signature|

## Plan, Deploy and Cleanup Infrastructure

|Command|Description|
|:-:|---|
|`terraform apply --auto-approve`|Apply changes without being prompted to enter “yes”|
|`terraform destroy --auto-approve`|Destroy/cleanup deployment without being prompted for “yes”|
|`terraform plan -out plan.out`|Output the deployment plan to plan.out|
|`terraform apply plan.out`|Use the plan.out plan file to deploy infrastructure|
|`terraform plan -destroy`|Outputs a destroy plan|
|`terraform apply -target=aws_instance.my_ec2`|Only apply/deploy changes to the targeted resource|
|`terraform apply -var my_region_variable=us-east-1`|Pass a variable via command-line while applying a configuration|
|`terraform apply -lock=true`|Lock the state file so it can’t be modified by any other Terraform apply or modification action|
|`terraform apply refresh=false`|Do not reconcile state file with real-world resources|
|`terraform apply --parallelism=5`|Number of simultaneous resource operations|
|`terraform refresh`|Reconcile the state in Terraform state file with real-world resources|
|`terraform providers`|Get information about providers used in current configuration|

## Terraform Workspace

|Command|Description|
|:-:|---|
|`terraform workspace new mynewworkspace`|Create a new workspace|
|`terraform workspace select default`|Change to the selected workspace|
|`terraform workspace list`|List out all workspaces|

## Terraform State Manipulation

|Command|Description|
|:-:|---|
|`terraform state show aws_instance.my_ec2`|Show details stored in Terraform state for the resource|
|`terraform state pull > terraform.tfstate`|Download and output terraform state to a file|
|`terraform state mv aws_iam_role.my_ssm_role module.custom_module`|Move a resource tracked via state to different module|
|`terraform state replace-provider hashicorp/aws registry.custom.com/aws`|Replace an existing provider with another|
|`terraform state list`|List out all the resources tracked via the current state file|
|`terraform state rm aws_instance.myinstace`|Unmanage a resource, delete it from Terraform state file|

## Terraform Import And Outputs


|Command|Description|
|:-:|---|
|`terraform import aws_instance.new_ec2_instance i-abcd1234`|Import EC2 instance with id i-abcd1234 into the Terraform resource named “new_ec2_instance” of type “aws_instance”|
|`terraform output`|List all outputs as stated in code|
|`terraform output instance_public_ip`|List out a specific declared|
|`terraform output -json`|List all outputs in JSON format|


## Terraform Miscelleneous commands


|Command|Description|
|:-:|---|
|`terraform version`|display Terraform binary version, also warns if version is old|
|`terraform get -update=true`|download and update modules in the “root” module.|