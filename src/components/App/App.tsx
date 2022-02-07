import React from 'react';
import Notify from '../Notify/Notify';
import styles from './App.module.sass'

function App() {

  const notifications = [
    { type: 'info', title: 'info', description: 'Some info here' },
    { type: 'error', title: 'error', description: 'Something crashed' },
    { type: 'success', title: 'success', description: 'Successfully done something' },
    { type: 'warning', title: 'warning', description: 'Something went wrong' }
  ]

  const onClick = () => {
    let _temp = notifications[Math.floor(Math.random() * 4)]
    // @ts-ignore
    window.Notify.createNotification(_temp.type, _temp.title, _temp.description)
  }

  return (
    <>
      <section className={styles.main}>
        <h1>React Notifications</h1>
        <button onClick={onClick}>Push random notify</button>
        <a href="https://github.com/kova1max">kova1max@github.com</a>
      </section>
      <Notify />
    </>
  );
}

export default App;
