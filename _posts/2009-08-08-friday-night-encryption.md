---
layout: default
title: Friday Night Encryption
created: 1249719567
---
Every once in awhile I will have a task that involves storing a password in the Drupal database, maybe so that a module can connect to a server or service.  Unfortunately it is not secure to store sensitive information in the database unless it is encrypted.  So tonight I wrote and released the [Encrypt module](http://drupal.org/project/encrypt)

### One-Way Encryption ###

Drupal core does store passwords in the database: the user passwords.  But this is [one-way encryption, or creating a hash](http://en.wikipedia.org/wiki/Cryptographic_hash_function), meaning that once encrypted there is no built-in way to retrieve the data that was hashed.  You can only compare hashes, hence why Drupal does not allow you to retrieve a lost password, simply it offers the ability to reset it.

### Two-Way Encryption ###

[Two-way encryption, or just encryption](http://en.wikipedia.org/wiki/Cryptography) is the idea of taking a message, altering it so that it is unrecognizable usually with some sort of key, then sending it someone that also shares that key and can decrypt the code to get the original message.  There are many methods of encryption, and it's hard to know what method is best.

Why do we need encryption?  Well, let's take for instance the example above.  I want the user to enter in their password for an FTP site so that I can get some files from it once a day.  But, I don't want the user to have to come to the site and enter in their password every day to do this.  Ideally I want to be able to store that password and retrieve it when I need it.  This is where encryption comes in.  We don't want to store the password in the database if it is not encrypted because your database may be compromised (and there is no reason to allow the database hacker to have access to the FTP account as well).  With encryption, we can create a ciphered text and store that in the database and retrieve when necessary, given that we still have the correct key.

### Why a Module? ###

There are no native functions in Drupal to handle encryption.  I don't actually know why, but I would speculate because PHP does not have native functions for encryption without the [mcrypt extension](http://www.php.net/mcrypt).  Mcrypt is very often already compiled with PHP, but not always.  Also, its encryption and is complicated, so there is a lot of weight riding on these functions.

So, I have had this idea for a long time:  An encryption module to provide two-way encryption for Drupal.  And tonight happen to be the night that I saw it all laid out in front of me.

### What the Encrypt Module Does ###

The [Encrypt module](http://drupal.org/project/encrypt) basically allows a developer to encrypt and decrypt data with the two easy functions:


<div>
{% highlight php %}
encrypt('some text');
{% endhighlight %}
</div>


and, then the decrypt function:


<div>
{% highlight php %}
decrypt('some already encrypted text');
{% endhighlight %}
</div>


There are parameters for options, but no options should be necessary.  Also, the encryption method is stored with the encrypted string, meaning that developers need not worry about tracking what methods are used.  In fact, it is suggested to simply just use the default method for the site, which can change at any point.

### Extending ###

Encryption methods are just implementation of hooks.  You can look at the project page or documentation in the code to see exactly what the hooks are, but the basic idea is creating a name a callback for the encryption method.

### Drupal Dependencies ###

I realize that this is an API module, and that the only real people using it will be developers.  The unfortunate part is that Drupal's module management does not really handle dependencies and version compatibility all that well.  Granted I am not offering a solution, as it is a tough problem, but I know that this fact will keep this module form being adopted when I know there are many cases where it could be used.

Thanks for listening and hope you enjoy the module.
