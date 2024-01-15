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

