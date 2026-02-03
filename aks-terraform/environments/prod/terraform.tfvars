location            = "eastus"
rg_name             = "aks-prod-rg"
aks_name            = "aks-prod"
acr_name            = "acrprodayu2026512"
vnet_name           = "aks-prod-vnet"
vnet_cidr           = ["10.10.0.0/16"]
system_subnet_cidr  = "10.10.1.0/24"
user_subnet_cidr    = "10.10.2.0/24"

tags = {
  environment = "prod"
  owner       = "platform"
  costcenter  = "production"
}
key_vault_name = "kv-aks-prod"
tenant_id      = "<YOUR_TENANT_ID>"
