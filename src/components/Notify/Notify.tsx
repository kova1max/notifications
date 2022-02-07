import React from 'react';
import styles from './Notify.module.sass';
const uuid = require('uuid')

export enum NotifyType {
  success = "success",
  info = "info",
  warning = "warning",
  error = "error"
}

class Notify extends React.Component {

  private items = new Map([])

  constructor(r: boolean = false) {
    super(r);
    Notify.returnJSXNotification = Notify.returnJSXNotification.bind(this)
    this.addItemToState = this.addItemToState.bind(this)
    this.removeItemFromState = this.removeItemFromState.bind(this)

    // @ts-ignore
    window.Notify = this;
  }

  public createNotification(type: NotifyType, title: string, description: string) {
    const item = this.addItemToState(type, title, description)
    setTimeout(() => {
      this.removeItemFromState(item)
    }, 6200)
  }

  private addItemToState(type: NotifyType, title: string, description: string): string {
    let _ = uuid.v4()
    this.items.set(_, {key: _, type, title, description})
    this.forceUpdate()
    return _
  }

  private removeItemFromState(id: string) {
    this.items.delete(id)
    this.forceUpdate()
  }

  private static returnJSXNotification(key: string, type: NotifyType, title: string, description: string): JSX.Element {
    return (
      <div key={key} className={styles.notifyItem + ' ' + styles[type]}>
        <span>{title}</span>
        {description}
      </div>
    )
  }

  render() {
    return (
      <div className={styles.notifyContainer}>
        {Array.from(this.items.values()).map((item: any) => Notify.returnJSXNotification(item.key, item.type, item.title, item.description))}
      </div>
    );
  }

}

export default Notify;