# Backbone.js系列教程十三：建立一个简单联系人应用

> 原文地址：http://www.gbtags.com/gb/share/2003.htm

## 概述

想象一下，你正在使用一个电子表格工具。首先创建一个叫做联系人的表单（也就是一个集合），然后定义表单中的数据域标题，在标题中输入"first name", "last name" 和 "phone" （一个模型）。基本上，你已经有了一个保管联系数据的电子表单（{firstName:'Jane, lastName:'Doe', phone:'111-111-1111'})。现在你想要从表单中使用这些信息创建一个UI（一个视图）来查看/添加/删除联系人。Backbone能够做到！让我们开始吧！

继承Backbone.Model，创建Contact函数/类

```javascript
var Contact = Backbone.Model.extend({
    defaults: {
        firstName: null,
        lastName: null,
        phone: null
    },
    getFullName: function(){
        return this.get('firstName') +' '+ this.get('lastName');
    }
});
```

## 实例化contacts集合，传递一个模型构造函数/分类与一个联系人

```javascript
var contacts = new Backbone.Collection({ //为其添加一些数据
    firstName: 'Jane',
    lastName: 'Doe',
    phone: '111-111-1111'
}, {
    model: Contact
});
```

## 继承Backbone.View，创建AddContactsView，实例化一个实例

```javascript
var ContactListView = Backbone.View.extend({
    el: '#contacts',
    events: {
        'click li button': 'removeContact'
    },
    initialize: function () {
        this.render(); //渲染列表
        this.listenTo(contacts, 'add remove', this.render); //the magic
    },
    removeContact: function (e) {
        $(e.target).parent('li').remove();
        contacts.findWhere({
            firstName: $(e.target).parent('li').find('span').text().split(' ')[0].trim(),
            lastName: $(e.target).parent('li').find('span').text().split(' ')[1].trim()
        }).destroy(); //将调用内部 'remove'事件
    },
    render: function () {
        if (contacts.length > 0) {
            this.$el.empty();
            contacts.each(function (contact) {
                this.$el.append('<li><span>' + contact.getFullName() + '</span>'+' / '+ contact.get('phone') + '<button type="button" class="btn-xs btn-danger removeContactBtn">X</button></li>');
            }, this);
        }
    }
});
var contactListViewInstance = new ContactListView();
```

## 继承Backbone.View，创建ContactListView，实例化一个实例

```javascript
var AddContactsView = Backbone.View.extend({
    el: 'fieldset',
    events: {
        'click button': 'addContact'
    },
    addContact: function () {
        var firstName = this.$('#firstName').val();
        var lastName = this.$('#lastName').val();
        var phone = this.$('#phone').val();
        if (firstName && lastName && phone) {
            contacts.add({ //将调用Backbone内部 'add'事件
                firstName: firstName,
                lastName: lastName,
                phone: phone
            });
            this.$('input').val('');
        }
    }
});
var addContactsViewInstance = new AddContactsView();
```

## 实例示范

```css
body {
    margin:10px;
}

.removeContactBtn{
    margin-left:10px;
}

#contacts {
    margin-bottom:0px;
}

#contacts li{
    margin-bottom:10px;
    margin-left:10px;
    display: inline-block;
}

#contacts li:last-child{
    margin-bottom:0px;
}

.form-inline .form-group {
display: inline-block;
margin-bottom: 0;
vertical-align: middle;
}
```

```html
<!-- functional programming utility library -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/lodash.js/1.3.1/lodash.underscore.js"></script>
<!-- DOM & XHR utility -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.2/jquery.min.js">
</script>
<!-- Backbone.js -->
<script src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js"></script>

<h4>联系人列表:</h4>

<div class="panel panel-default">
    <div class="panel-body">
        <ul id="contacts" class="list-unstyled"></ul>
    </div>
</div>

<h4>添加联系人:</h4>

<fieldset class="form-inline" role="form">
    <div class="form-group">
        <input type="text" class="form-control" id="firstName" value="John" placeholder="First Name" style="width:120px;" />
    </div>
    <div class="form-group">
        <input type="text" class="form-control" id="lastName" value="Doe" placeholder="Last Name" style="width:120px;" />
    </div>
    <div class="form-group">
        <input type="tel" class="form-control" id="phone" value="000-000-0000" placeholder="Phone #" style="width:120px;" />
    </div>
    <br>
        <br>
    <button class="btn btn-primary btn-sm">Add</button>
</fieldset>

```

```javascript
var Contact = Backbone.Model.extend({
    defaults: {
        firstName: null,
        lastName: null,
        phone: null
    },
    getName: function () {
        return this.get('firstName') + ' ' + this.get('lastName');
    }
});

var contacts = new Backbone.Collection({ 
    firstName: 'Jane',
    lastName: 'Doe',
    phone: '111-111-1111'
}, {
    model: Contact
});

var AddContactsView = Backbone.View.extend({
    el: 'fieldset',
    events: {
        'click button': 'addContact'
    },
    addContact: function () {
        var firstName = this.$('#firstName').val();
        var lastName = this.$('#lastName').val();
        var phone = this.$('#phone').val();
        if (firstName && lastName && phone) {
            contacts.add({ 
                firstName: firstName,
                lastName: lastName,
                phone: phone
            });
            this.$('input').val('');
        }
    }
});
var addContactsViewInstance = new AddContactsView();

var ContactListView = Backbone.View.extend({
    el: '#contacts',
    events: {
        'click li button': 'removeContact'
    },
    initialize: function () {
        this.render(); 
        this.listenTo(contacts, 'add remove', this.render); 
    },
    removeContact: function (e) {
        $(e.target).parent('li').remove();
        contacts.findWhere({
            firstName: $(e.target).parent('li').find('span').text().split(' ')[0].trim(),
            lastName: $(e.target).parent('li').find('span').text().split(' ')[1].trim()
        }).destroy(); 
    },
    render: function () {
        if (contacts.length > 0) {
            this.$el.empty();
            contacts.each(function (contact) {
                this.$el.append('<li><span>' + contact.getName() + '</span>'+' / '+ contact.get('phone') + '<button type="button" class="btn-xs btn-danger removeContactBtn">X</button></li>');
            }, this);
        }
    }
});
var contactListViewInstance = new ContactListView();
```

下面是本小节关于联系人应用程序的工作演示。检查应用程序代码，直到完全理解创建过程中每一部分(即模型、收集、视图)的角色和功能。需要参考前几个小节的内容。

## 结论

这篇文章指导读者彻底了解Backbone视图，模型和集合。在本文的下一部分，我们将尝试[同步](http://backbonejs.org/#Sync)以及将同步模型的方法与集合关联到后台。