import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Content from './Content';
import Queue from './Queue';
function Container({ location }) {
  return (
    <div className="content__container">
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={location.key}
          timeout={{ enter: 300, exit: 300 }}
          classNames="fade"
        >
          <section className="route-section">
            <Switch location={location}>
              <Route exact path="/"
                component={Content}
              />
              <Route exact path="/queue"
                component={Queue}
              />
            </Switch>
          </section>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}


export default withRouter(Container);
