#!/bin/bash

./demo-image-ecr.sh


kubectl delete deployment rickcloudy-fe -n rickcloudy-fe
kubectl delete service rickcloudy-fe -n rickcloudy-fe
kubectl delete ingress rickcloudy-fe -n rickcloudy-fe

kubectl apply -f manifest.yaml -n rickcloudy-fe

kubectl get pods -n rickcloudy-fe
