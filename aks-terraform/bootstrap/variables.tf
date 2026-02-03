variable "location" {
  default = "eastus"
}

variable "rg_name" {
  default = "tfstate-rg"
}

variable "storage_account_name" {
  description = "Globally unique storage account name"
}

variable "container_name" {
  default = "tfstate"
}
