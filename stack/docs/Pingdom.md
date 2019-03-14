## Pingdom

This guide has the key points you neeed to set up Pingom 

### Setting up on Slack

Visit [Slack's app manager](https://appliedblockchain.slack.com/apps/manage) for Applied Blockchain.

* Search for **Pingdom** on the list of apps then click on it.
* Click on **Add Configuration**.
* Choose the channel to be notified (use either the project's channel or *projectname-notifications*).
* Click on **Add Pingdom Integration**.

You'll be redirected to a page with more configuration's to add onto Pingdom but for now, all we'll need is the **Webhook URL**.

### Setting up on Pingdom

Visit [Pingdom's Official Website](https://www.pingdom.com/) and login. We should have a shared account on [1Password](https://1password.com/).
There are a couple of checks you should do before actually integrating the monitoring:

- Go to the **Users and teams** tab then **Users**. If you've not been added already, please do it yourself.
- Go to the **Users and teams** tab then **Teams**. If your team/project is not added already, please do and add all the appropriate members.

#### Integrating Pingdom

* Go to **Integration** and click on **Integrations** tab.
* Click on **Add new**. Put an appropriate name to the webhook as well as the **Webhook URL** we've just got from Slack. Click **Save Integration**.
* Go to **Experience Monitoring** and click on the **Uptime** tab.
* Click on **Add new**. A window will popup and you should set the appropriate fields for the API healthcheck route:
  * Name: should be compatible to the project API to be monitored;
  * Web: HTTP(s);
  * URL/IP: *https://* *example.io/api/health*;
    * Optional tab: insert port if needed
  * Who to alert: check your team or individuals;
  * Scroll down the window and check *your webhook* you've inserted on the integration's tab.
  * **Add** the new check you've configured.

You can then try to test the monitoring service by clicking on **Test** within the Uptime window.
