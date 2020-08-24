# mqtt with aws amplify

cf : https://docs.amplify.aws/lib/pubsub/getting-started/q/platform/js#third-party-mqtt-providers

```javascript

import { PubSub } from 'aws-amplify';
import { MqttOverWSProvider } from "@aws-amplify/pubsub/lib/Providers";

// Apply plugin with configuration
Amplify.addPluggable(new MqttOverWSProvider({
    aws_pubsub_endpoint: 'wss://iot.eclipse.org:443/mqtt',
}));

import PubSub from '@aws-amplify/pubsub';

PubSub.configure();

```

* need to make aws iam policy for web application.
* need to authenticate with cognito 

