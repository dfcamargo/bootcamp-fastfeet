import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Delivery from '~/pages/Delivery';
import NewDelivery from '~/pages/Delivery/new';
import EditDelivery from '~/pages/Delivery/edit';

import Deliveryman from '~/pages/Deliveryman';
import NewDeliveryman from '~/pages/Deliveryman/new';
import EditDeliveryman from '~/pages/Deliveryman/edit';

import Recipient from '~/pages/Recipient';
import NewRecipient from '~/pages/Recipient/new';
import EditRecipient from '~/pages/Recipient/edit';

import DeliveryProblem from '~/pages/DeliveryProblem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />

      <Route path="/deliveries" exact component={Delivery} isPrivate />
      <Route path="/deliveries/new" component={NewDelivery} isPrivate />
      <Route path="/deliveries/edit/:id" component={EditDelivery} isPrivate />

      <Route path="/deliverymen" exact component={Deliveryman} isPrivate />
      <Route path="/deliverymen/new" component={NewDeliveryman} isPrivate />
      <Route
        path="/deliverymen/edit/:id"
        component={EditDeliveryman}
        isPrivate
      />

      <Route path="/recipients" exact component={Recipient} isPrivate />
      <Route path="/recipients/new" component={NewRecipient} isPrivate />
      <Route path="/recipients/edit/:id" component={EditRecipient} isPrivate />

      <Route path="/problems" component={DeliveryProblem} isPrivate />
    </Switch>
  );
}
