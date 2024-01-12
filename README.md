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

