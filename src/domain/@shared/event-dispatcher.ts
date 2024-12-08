
import { EventDispatcherInterface } from "./event/event-dispatcher.interface";
import { EventHandlerInterface } from "./event/event-handler.interface";
import { EventInterface } from "./event/event.interface";

interface EventHandlers {
  [eventName: string]: EventHandlerInterface[];
}

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: EventHandlers = {};

  get getEventHandlers(): EventHandlers {
    return this.eventHandlers;
  }
  notify(event: EventInterface): void {
    if (this.eventHandlers[event.constructor.name]) {
      this.eventHandlers[event.constructor.name].forEach((eventHandler) => {
        eventHandler.handle(event);
      });
    }
  }
  register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }
  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    if (eventName in this.eventHandlers) {
      this.eventHandlers[eventName] = this.eventHandlers[eventName].filter(
        (event) => event !== eventHandler
      );
    }
  }
  unregisterAll(): void {
    this.eventHandlers = {};
  }
}
