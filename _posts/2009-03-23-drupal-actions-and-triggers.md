---
layout: default
title: Drupal Actions and Triggers
created: 1237785425
---
[Actions and Triggers](http://drupal.org/node/199254) are awesome, and they made it into core with Drupal 6. The combination of the modules creates an event and responder system for Drupal.  On a basic level, Triggers are like events in (for instance, creating a comment).  Actions are then the responding procedure that Drupal takes based on that Trigger.

### Actions

Creating actions is explained well in this article, [Writing an Action for Drupal 6](http://www.sysarchitects.com/node/47), and if you have the [Pro Drupal Development: 2nd Edition](http://www.drupalbook.com/) book, there is a good chapter about creating actions.

### Triggers

Triggers, on the other hand, have little documentation on how to create new ones.  There are many built in triggers that provide a lot of events to attach actions to.  But, when creating any critical modules, it is important to be able to set events so that logging and notifying can happen at the right points.

So, here is some example code for creating your own trigger.

#### Example

##### Permissions

This hook is not necessary to implement.  But as I think it is good practice to implement specific permissions, I am including it.  There is also a bug/problem with the trigger module, which restricts [access control to triggers based on module name](http://drupal.org/node/324183]).  Which I volunteered to patch and have not followed through with; my apologies.  Nonetheless, we can work around this with hook_menu_alter().


<div>
{% highlight php %}
/**
 * Implementation of hook_perm().
 */
function example_perm() {
  return array('administer our modules triggers');
}
{% endhighlight %}
</div>


##### Menu Alter

We want the permissions for administering our trigger to be unique, so we implement this hook.


<div>
{% highlight php %}
/**
 * Implementation of hook_menu_alter
 */
function example_menu_alter(&amp;$items) {
  // By default, the trigger system uses the module name 
  // (i.e. example) as the access for the trigger
  // configuration menu item.  we want to change that.
  $items['admin/build/trigger/example']['access arguments'] = array('administer our modules triggers');
}
{% endhighlight %}
</div>


##### Hook Info

This hook tells the trigger module about our triggers.


<div>
{% highlight php %}
/**
 * Implementation of hook_hook_info
 */
function example_hook_info() {
  // Define triggers
  $items = array(
    'example' => array(
      'example' => array(
        'our_new_trigger' => array(
          'runs when' => t('When we put in our trigger, thats when it will run.'),
        ),
      ),
    ),
  );
  return $items;
} 
{% endhighlight %}
</div>


##### Attaching Actions

The next step is to define which actions will be able to be run with our triggers.  We will add two actions that are already provided: the Message and Email actions.  We don't want to step on any other trigger toes.  If we are not careful, we will make it so that actions will only be allowed on our trigger.  So, we implement some basic conditional logic.


<div>
{% highlight php %}
/**
 * Implementation of hook_action_info_alter
 */
function example_action_info_alter(&amp;$info) {
  // We want to add this modules's triggers to the email action
  if (isset($info['system_send_email_action']['hooks']['example'])) {
    array_merge($info['system_send_email_action']['hooks']['example'], array('our_new_trigger'));
  } else {
    $info['system_send_email_action']['hooks']['example'] = array('our_new_trigger');
  }
  
  // We want to add this modules's triggers to the message action
  if (isset($info['system_message_action']['hooks']['example'])) {
    array_merge($info['system_message_action']['hooks']['example'], array('our_new_trigger'));
  } else {
    $info['system_message_action']['hooks']['example'] = array('our_new_trigger');
  }
}
{% endhighlight %}
</div>


##### Invoke Wrapper

This is unnecessary, but helps a lot.  We want to make sure that all modules know whats going on when we call our trigger, so we create this wrapper function.


<div>
{% highlight php %}
/**
 * Invoke trigger
 *
 * This function is a wrapper/helper for triggers/hooks
 *
 * @param $hook
 *   string describing hook
 * @param $op
 *   string describing operation
 * @return
 *   boolean, true or false if successful
 */
function example_invoke_hook($hook = 'example', $op = null, $object = null) {
  // Perform hook invoke
  // Given the complexity of your module, you might already have hooks and might need to change this
  module_invoke_all($hook, $op);
  // Call trigger/actions
  $aids = _trigger_get_hook_aids($hook, $op);
  $context = array('hook' => $hook, 'op' => $op);
  actions_do(array_keys($aids), $object, $context);
  return true;
}
{% endhighlight %}
</div>


##### Calling Our Trigger

This is just a sample function where we call our new trigger.


<div>
{% highlight php %}
/**
 * Some function
 */
function example_function($params = array()) {
  // ...
  // We are doing stuff, and then BAM! trigger
  example_invoke_hook('example', 'our_new_trigger');
} 
{% endhighlight %}
</div>
