We are creating a seperate namespace for each environment
Each environment will have its own application port

Checking logs for the pod:
kubectl logs -p <pod-name> --previous=false

Checking logs for service:
kubectl describe service/<service-name>

Kubernetes Objects and their Purpose

1. Pod: Group of 1 or more containers.

2. Deployment: You can define the desired state in a deployment and the deployment controller is
responsible for changing the current state to the desired state.

3. Replica Set :It ensures that a stable set of pods which are exact replicas of each other are
running at any given time

4. Services:For a given Deployment in your cluster, the set of Pods running in one moment in time could be different from the set of Pods running that application a moment later.Each Pod gets its own IP address.
Pods are ephemeral resources (you should not expect that an individual Pod is reliable and durable).

This leads to a problem: if some set of Pods (call them "backends") provides functionality to other Pods (call them "frontends") inside your cluster, how do the frontends find out and keep track of which IP address to connect to, so that the frontend can use the backend part of the workload?

Enter Services.

For example, consider a stateless image-processing backend which is running with 3 replicas i.e 3 pods which are replicas of each other are running the same application. Those replicas are fungible—frontends do not care which backend they use. While the actual Pods that compose the backend set may change, the frontend clients should not need to be aware of that, nor should they need to keep track of the set of backends themselves.

The Service abstraction enables this decoupling.

You use a Service to make that set of Pods available on the network so that clients can interact with it.



yaml file reference:

1. apiVersion :Which version of the Kubernetes API you're using to create this object
2. kind :What kind of object you want to create eg: Pod,Deployment etc
3. metadata :Data that helps uniquely identify the object,

Properties Under metadata

=> name: name assigned to the object
=> labels:key/value pairs used to specify identifying attributes of objects that are meaningful and relevant to users

4. spec : the state you desire for the object. The precise format of the object spec is different for every Kubernetes object, and contains nested fields specific to that object.


spec object properties for Deployment object

1. selector:A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.

matchLabels is a map of {key,value} pairs. 

.spec.selector is a required field that specifies a label selector for the Pods targeted by this Deployment.
.spec.selector must match .spec.template.metadata.labels, or it will be rejected by the API.

2. template:Template describes the pods that will be created. 

Properties under template:

=>metadata : data which helps to uniquely identify the object

=>spec:Specification of the desired behavior of the pod. 

spec object properties for Pod Object

1. containers :List of containers belonging to the pod. 

properties under containers
=>name:Name of the container specified as a DNS_LABEL. Each container in a pod must have a unique name (DNS_LABEL).

=>image:Container image name. 

=>ports:List of ports to expose from the container. Not specifying a port here DOES NOT prevent that port from being exposed. Any port which is listening on the default "0.0.0.0" address inside a container will be accessible from the network.

containerPort:Number of port to expose on the pod's IP address. This must be a valid port number, 0 < x < 65536.

Spec  of a service

spec.selectors will identify the pods handled by the service.
You must provide with the correct identification.

---------------------------------------------------------------------------------------------------------------
1. NodePort type service

port:8081
NodePort:31099  /either you set or system sets it for you
targetPort:80

targetPort is the port on which the container is litening inside the pod.
It must be the same as the port on which the nginx webserver is listening

NodePort is the port on which the nodeport service inside the cluster is listening to

port is the port on the cluster IP service is listenting. This is also the port on which you
access the application in the browser.

Client Request---->nodeIp:Nodeport ---->clusterIp:port ----> podIp:targetPort

Using "kubectl get pod/angular-kube-dev-deployment-6c454b9b4-25q6z -o yaml"
I can get the podIp and the hostIp/nodeIp

 hostIP: 192.168.65.3
  phase: Running
  podIP: 10.1.0.83
  podIPs:
  - ip: 10.1.0.83
  
From kubectl get services, I can get the cluster IP

PS C:\Users\User\angular\kubernetes-angular> kubectl get services
NAME                     TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
kubernetes               ClusterIP   10.96.0.1        <none>        443/TCP          3d18h
nginx-loadbalancer-dev   NodePort    10.101.192.183   <none>        8081:31099/TCP   3d18h
PS C:\Users\User\angular\kubernetes-angular> 

Here 10.101.192.183  is the cluster ip.

Now if I "kubectl exec pod/angular-kube-dev-deployment-6c454b9b4-25q6z -it sh"
i.e shell into the pod to access the project build files or performing curl

I can do 3 things here:

curl nodeIp:Nodeport

/ # curl http://192.168.65.3:31099
<!doctype html>
<html lang="en" data-critters-container>
<head>
  <meta charset="utf-8">
  <title>KubernetesAngular</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.ef46db3751d8e999.css"></head>
<body>
  <app-root></app-root>
<script src="runtime.b5090f3ab16f25ec.js" type="module"></script><script src="polyfills.7f5ceee59efdad27.js" type="module"></script><script src="main.740f9b04639d4b52.js" type="module"></script></body>
</html>
/ #

curl podIp:targetPort

/ # curl http://10.1.0.83
<!doctype html>
<html lang="en" data-critters-container>
<head>
  <meta charset="utf-8">
  <title>KubernetesAngular</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.ef46db3751d8e999.css"></head>
<body>
  <app-root></app-root>
<script src="runtime.b5090f3ab16f25ec.js" type="module"></script><script src="polyfills.7f5ceee59efdad27.js" type="module"></script><script src="main.740f9b04639d4b52.js" type="module"></script></body>
</html>


curl clusterIp:port

/ # curl http://10.101.192.183:8081
<!doctype html>
<html lang="en" data-critters-container>
<head>
  <meta charset="utf-8">
  <title>KubernetesAngular</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.ef46db3751d8e999.css"></head>
<body>
  <app-root></app-root>
<script src="runtime.b5090f3ab16f25ec.js" type="module"></script><script src="polyfills.7f5ceee59efdad27.js" type="module"></script><script src="main.740f9b04639d4b52.js" type="module"></script></body>
</html>

------------------------------------------------------------------------------------------------------------

2. LoadBalancer ---same as Nodeport service but also provides loadbalancing to the nodes.

NAME                     TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
kubernetes               ClusterIP      10.96.0.1        <none>        443/TCP          3d18h
nginx-loadbalancer-dev   LoadBalancer   10.101.192.183   localhost     8081:31099/TCP   3d18h

LoadBalancer service is built upon the NodePort service

Port:8081  --- port on which the cluster ip listens for requests from the node and application runs in browser
TargetPort:80   ---port on which the container inside the pod runs
node port:31099  ---- port on which the node listens for requests

The cluster ip service loadbalances the traffic to the pods.
The loadbalancer service loadbalances the traffic to the nodes.

PS C:\Users\User\angular\kubernetes-angular> kubectl get pods
NAME                                          READY   STATUS    RESTARTS   AGE
angular-kube-dev-deployment-6c454b9b4-25q6z   1/1     Running   0          150m
PS C:\Users\User\angular\kubernetes-angular> 

What is the pod and node ip ?

kubectl get pod/angular-kube-dev-deployment-6c454b9b4-25q6z -o yaml

      startedAt: "2024-01-21T06:25:45Z"
  hostIP: 192.168.65.3
  phase: Running
  podIP: 10.1.0.83
  podIPs:
  - ip: 10.1.0.83
  
 Shell login into the pod
 
 C:\Users\User>kubectl exec angular-kube-dev-deployment-6c454b9b4-25q6z -it sh
kubectl exec [POD] [COMMAND] is DEPRECATED and will be removed in a future version. Use kubectl exec [POD] -- [COMMAND] instead.

curl podIp:targetPort


/ # curl http://10.1.0.83
<!doctype html>
<html lang="en" data-critters-container>
<head>
  <meta charset="utf-8">
  <title>KubernetesAngular</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.ef46db3751d8e999.css"></head>
<body>
  <app-root></app-root>
<script src="runtime.b5090f3ab16f25ec.js" type="module"></script><script src="polyfills.7f5ceee59efdad27.js" type="module"></script><script src="main.740f9b04639d4b52.js" type="module"></script></body>
</html>
/ #


curl clusterIp:port

</html>
/ # curl http://10.101.192.183:8081
<!doctype html>
<html lang="en" data-critters-container>
<head>
  <meta charset="utf-8">
  <title>KubernetesAngular</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.ef46db3751d8e999.css"></head>
<body>
  <app-root></app-root>
<script src="runtime.b5090f3ab16f25ec.js" type="module"></script><script src="polyfills.7f5ceee59efdad27.js" type="module"></script><script src="main.740f9b04639d4b52.js" type="module"></script></body>
</html>
/ #


curl servicename:port

/ # curl http://nginx-loadbalancer-dev:8081
<!doctype html>
<html lang="en" data-critters-container>
<head>
  <meta charset="utf-8">
  <title>KubernetesAngular</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.ef46db3751d8e999.css"></head>
<body>
  <app-root></app-root>
<script src="runtime.b5090f3ab16f25ec.js" type="module"></script><script src="polyfills.7f5ceee59efdad27.js" type="module"></script><script src="main.740f9b04639d4b52.js" type="module"></script></body>
</html>


curl nodeIp:nodePort

/ # curl http://192.168.65.3:31099
<!doctype html>
<html lang="en" data-critters-container>
<head>
  <meta charset="utf-8">
  <title>KubernetesAngular</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="stylesheet" href="styles.ef46db3751d8e999.css"></head>
<body>
  <app-root></app-root>
<script src="runtime.b5090f3ab16f25ec.js" type="module"></script><script src="polyfills.7f5ceee59efdad27.js" type="module"></script><script src="main.740f9b04639d4b52.js" type="module"></script></body>
</html>
/ #

