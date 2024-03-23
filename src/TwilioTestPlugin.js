import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';

import { Actions, ITask } from '@twilio/flex-ui';

import ChatPrompt from './components/ChatPrompt/ChatPrompt';
import { sendGoodbaySMS } from './services/api';

const PLUGIN_NAME = 'TwilioTestPlugin';


export default class TwilioTestPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   * @param ITask { typeof import('@twilio/flex-ui') }
  */
 async init(flex, manager) {
    manager.strings.NoTasks = "No tasks, play some ping pong :)"

    // replace CRM panel with send message form
    flex.AgentDesktopView.Panel2.Content.replace(<ChatPrompt manager={manager} key="TwilioTestPlugin-component" />, {
      align: "end",
    })

    //  listen to received voice tasks and invoke action to accept the call
    manager.events.addListener("taskReceived", (task:ITask) => {
      if(task.channelType === "voice"){
        Actions.invokeAction("AcceptTask", { task: task });
      }
    });

    // create custom action for sending goodbay sms
    flex.Actions.registerAction("SendGoodbay", async (payload) => {
      const to = payload.task.attributes.from;
      const from = payload.task.attributes.to;
      await sendGoodbaySMS(from,to)
    });

    // invoke custom SendGoodbay action when hanging up the call
    flex.Actions.addListener("afterHangupCall", (payload) => {
      return flex.Actions.invokeAction("SendGoodbay",payload);
    });

  }
}
