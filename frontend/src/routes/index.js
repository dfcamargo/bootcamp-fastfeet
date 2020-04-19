import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import Delivery from '~/pages/Delivery';
import CreateDelivery from '~/pages/Delivery/create';
import UpdateDelivery from '~/pages/Delivery/update';

import Deliveryman from '~/pages/Deliveryman';
import CreateDeliveryman from '~/pages/Deliveryman/create';
import UpdateDeliveryman from '~/pages/Deliveryman/update';

import Recipient from '~/pages/Recipient';
import CreateRecipient from '~/pages/Recipient/create';
import UpdateRecipient from '~/pages/Recipient/update';

import DeliveryProblem from '~/pages/DeliveryProblem';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/deliveries" exact component={Delivery} isPrivate />
      <Route path="/deliveries/new" component={CreateDelivery} isPrivate />
      <Route path="/deliveries/edit/:id" component={UpdateDelivery} isPrivate />

      <Route path="/deliverymen" exact component={Deliveryman} isPrivate />
      <Route path="/deliverymen/new" component={CreateDeliveryman} isPrivate />
      <Route
        path="/deliverymen/edit/:id"
        component={UpdateDeliveryman}
        isPrivate
      />

      <Route path="/recipients" exact component={Recipient} isPrivate />
      <Route path="/recipients/new" component={CreateRecipient} isPrivate />
      <Route
        path="/recipients/edit/:id"
        component={UpdateRecipient}
        isPrivate
      />

      <Route path="/problems" component={DeliveryProblem} isPrivate />
    </Switch>
  );
}
