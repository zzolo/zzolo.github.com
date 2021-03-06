---
layout: post
title: Tip for Managing Variables in a Drupal Module
created: 1266420162
---

**Update via Garrett Albright** (see comments)

Just a quick tip for managing variables in a Drupal module.  <strong>Please prefix your variables with your module name</strong>.  For example:

<div>
{% highlight php %}
variable_set('examplemodule_variable_name', 1234);
{% endhighlight %}
</div>

This ensures that another module won't override your variable, or your module won't do the same thing.  Pretty simple.  But what is also nice, is that you can clean up after your module a lot easier in the uninstall hook:

<div>
{% highlight php %}
/**
 * Implementation of hook_uninstall().
 */
function examplemodule_uninstall() {
  // Get global variable array
  global $conf;
  foreach (array_keys($conf) as $key) {
    // Find variables that have the module prefix
    if (strpos($key, 'examplemodule_') === 0) {
      variable_del($key);
    }
  }
}
{% endhighlight %}
</div>

Please note that the above convention could cause problems if your module name is something like <code>content_permissions</code> and then the content module (CCK) defines a variable with a conflicting name.  All the more reason to make your module names more unique and without underscores.

Old code that needlessly queries the database:

<div>
{% highlight php %}
/**
 * Implementation of hook_uninstall().
 */
function examplemodule_uninstall() {
  // Get module variables
  $results = db_query("SELECT v.name FROM {variable} AS v WHERE v.name LIKE '%s%%'", 'examplemodule_');
  // Remove variables
  while ($row = db_fetch_array($results)) {
    variable_del($row['name']);
  }
}
{% endhighlight %}
</div>
