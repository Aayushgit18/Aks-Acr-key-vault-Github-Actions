output "aks_cluster_name" {
  value = module.aks.cluster_name
}

output "aks_resource_group" {
  value = module.rg.name
}

output "aks_kubeconfig" {
  value     = module.aks.kubeconfig
  sensitive = true
}

output "acr_login_server" {
  value = module.acr.login_server
}
