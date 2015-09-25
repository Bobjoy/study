# Backbone.js系列教程十一：Backbone.Model

> 原文地址：http://www.gbtags.com/gb/share/2000.htm

## Backbone.Model概论

一个Backbone 模型可以比作一张表单结构，头部类似表单的列，数据类似表单的行。Backbone.Model对象定义列标签，再用预定义和自定义的方法包裹每一行里的数据（即属性），以便进行数据转换、验证和访问控制。由Backbone.Model创建模型实例或者一个继承的Backbone.Model，提供对象到实际数据的存储。例如，一个联系应用程序中的联系模型就像下面这样： 

![](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-25/lxmx.jpg)

你可以把一个Backbone.Model构造函数比作表单的列标题，其方法和属性通用于每一行的数据。由构造函数创建的一个实例，用实际数据填充上面的表格。

```javascript
//i.e.
new Backbone.Model(
   {firstName:'John',lastName:'Doe',phone:'1-111-1111'}
);
```

请注意，Backbone.Model为每一行数据提供属性和方法（例如：get('phone')），也支持定义你自己的方法和属性（例如：getFullName()）。

以上提到的内容只是Backbone模型的部分特性。在Backbone里，还有一部分内容涉及在HTTP上通过restful JSON api使用AJAX来同步数据。在本文中，我们将不讨论关于同步的细节。本小节主要讨论的是一个模型（以及模型的集合）的生命周期，但不包括同步数据这一块。

## 子类与创建一个Backbone.Model

要创建一个通用数据模型，我们只需要从Backbone.Model实例化一个实例，再传入模型将储存的值（也就是Backbone属性）。例如，下面我创建了两个联系模型，一个是JohnDoe，另一个是JaneDoe。

```javascript
var contact1Model = new Backbone.Model(
    {firstName:'John',lastName:'Doe',phone:'111-111-1111'}
);
 
var contact2Model = new Backbone.Model(
    {firstName:'Jane',lastName:'Doe',phone:'222-222-2222'}
);
```

然而，更倾向于先继承/分类基础Backbone.Model，再实例化一个实例，这样你就可以添加自己域特定的属性。

在下面代码的中，我继承了Backbone.Model构造函数，创建出一个子构造函数（ContactModel），并定义getFullName()方法，于是所有创建于ContactModel的模型都将继承getFullName()方法。

```javascript
var ContactModel = Backbone.Model.extend({ //extend Backbone.Model
    getFullName:function(){
        return this.get('firstName') +' '+ this.get('lastName');
    }
});
 
var contact1Model = new ContactModel( //instantiate ContactModel instance
    {firstName:'John',lastName:'Doe',phone:'111-111-1111'}
);
 
var contact2Model = new ContactModel( //instantiate ContactModel instance
    {firstName:'Jane',lastName:'Doe',phone:'222-222-2222'}
);
 
//在我们的模型上调用getFullName方法
console.log(contact1Model.getFullName()); //logs John Doe
console.log(contact2Model.getFullName()); //logs Jane Doe
```

*提示：*

1. 当实例化一个模型时，一组数据可以被传入到一个对象的位置。在这之后Backbone将转移这个数组到一个对象，通过给予传递值（['foo','bar']）数值的属性名称，成为了（{'1':'foo','2','bar'}）。
2. 实例化模型传递的第二个参数是一个选项对象，包含了collection, url, urlRoot和parse选项。其中大部分将在下一篇文章中加以详述，因为它们涉及到同步数据。
3. 别忘了initialize函数，在继承模型时设置的，用于放置创建模型实例需要运行的逻辑关系。尤其需要注意的是，初始化函数中的this值是所创建的模型实例的作用域。
4. 一种方便的clone()方法在模型实例上可用，将返回一个新的模型实例附带一份clone()方法调用的数据副本。这是从模型实例上创建模型的一种便捷方式。

## Backbone.Model方法、属性与事件

Backbone模型实例包含以下[方法和属性](http://backbonejs.org/#View)：

* get
* set
* escape
* has
* unset
* clear
* id
* idAttribute
* cid
* attributes
* changed
* defaults
* toJSON
* sync
* fetch
* save
* destroy
* Underscore Methods:（keys、values、pairs、invert、pick、omit）
* validate
* validationError
* isValid
* url
* urlRoot
* parse
* clone
* isNew
* hasChanged
* changedAttributes
* previous
* previousAttributes

粗体所显示的方法或属性不会在本文章中叙述，在以后的文章中我们会讨论到这些与同步相关的方法或属性。

此外，模型还可以使用以下嵌入事件：

![](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-25/qrsj.jpg)

## 设定模型的默认值/属性

在继承一个模型时，你可以设定一系列默认值共享给所有实例。在下面的代码中，我设置了一个默认值给firstName和lastName。

```javascript
var ContactModel = Backbone.Model.extend({ //继承Backbone.Model
    defaults: {
        firstName : 'no first name yet',
        lastName : 'no last name yet'
    }
});
 
var contact1Model = new ContactModel( //实例化模型实例
    {firstName:'John'}
);
// firstName设置为John，同时保持lastname为默认值不变
console.log(contact1Model.get('firstName')); //日志 John
console.log(contact1Model.get('lastName')); //日志'no last name yet'
```

如果你想让实例不引用同一个默认对象，你可以提供一个默认函数值，将会创造出特殊的默认值（不引用同一个默认对象）。

```javascript
var ContactModel = Backbone.Model.extend({ //继承Backbone.Model
    defaults: function(){
        this.firstName = 'no first name yet';
        this.lastName = 'no last name yet';
        return this;
    }
});
 
var contact1Model = new ContactModel( //实例化模型实例
    {firstName:'John'}
);
// firstName设置为John，同时保持lastname默认值不变
console.log(contact1Model.get('firstName')); //日志 John
console.log(contact1Model.get('lastName')); //日志 'no last name yet'
```

在上面代码中，每一个实例各将会使用一个特殊默认对象，而不是每一个实例引用同一个默认对象。

## 模型数据的设置、更改、获取、复原与删除

Backbone提供一组通用的方法（set(), has(), get(), unset(), clear()）来处理模型数据。下面我将演示每一种方法。

```javascript
var contact = new Backbone.Model(); //实例化模型实例
//设置/编辑数据
contact.set({firstName:"John",lastname:'Doe',phone:'1-111-1111'});
//拥有firstName属性，注意，无论属性值为何都将返回true
console.log(contact.has('firstName')); //日志 true          
//获取数据
console.log(contact.get('firstName')); //日志 John
//复原数据
contact.unset('lastname');
//验证数据已被复原
console.log(contact.has('lastName')); //日志 false
//清除所有数据
contact.clear();
//验证数据已被清除
console.log(contact.attributes); //日志 empty {}
```

*提示：*

1. 这些方法应当被用来替代直接编辑内部attributes对象，以便模型中的事件能够被正确的触发。
2. set(), unset()和clear()方法能够调用内部change事件。
3. set()方法接收一个选项对象（例如：set({'name':'value','name':'value'})）或两个字符串参数（例如：set('name','value')）。
4. set(), unset()和clear()方法都接收{silent: true}选项，阻止任意Backbone嵌入事件发生。
5. 在设置值之前，{validate:true}选项和set()方法能够一起用来验证这些值（例如：set({'foo':'foo'},{validate:true})）。

## 访问一个模型数据/属性

Backbone提供attributes属性，能够直接访问包含一个模型数据的内部对象。

```javascript
var contact1Model = new Backbone.Model( //instantiate model instance
    {firstName:'John',lastName:'Doe'}
);
 
console.log(contact1Model.attributes); //日志 {firstName="John", lastName="Doe"}
```

Backbone提供直接访问到这个对象，一般情况下该对象不会被直接操纵。事实上，也不要这样做。如果你想编辑模型数据，可以使用set(), get(), unset(), clear()或者复制（model.toJSON();）attributes对象，编辑副本之后再利用set()更新模型。

*提示：*

* 直接操纵attributes属性将不会调用内部模型事件。

## 利用toJSON()获取模型数据/属性的一个副本

toJSON()模型方法返回attributes内部数据对象的一个副本。

```javascript
var contact1Model = new Backbone.Model( //实例化模型实例
    {firstName:'John',lastName:'Doe'}
);
 
console.log(contact1Model.toJSON()); //日志 {firstName="John", lastName="Doe"}
 
//请注意，这不是一个引用，而是属性对象的一个副本
//i.e.
console.log(contact1Model.toJSON === contact1Model.attributes); //日志 false
```

当你需要获取一个对象的干净的副本作为一个模板时，这种方法非常方便。

*提示：*

1. 使用toJSON()方法可以获取属性对象的一个浅表克隆（ _.clone），任意嵌套对象或数组将从原型引用，而不是复制。 
2. 传递一个模型实例到JSON.stringify，将内部使用Backbone的toJSON()方法。

## 过滤模型数据

Backbone从underscore.js库代理6种方法（keys(), values(), pairs(), invert(), pick(), omit()），都可以直接用在模型数据上。这些函数可以为过滤所需模型数据状态提供帮助。下面我将展示最常用的4种方法。

```javascript
var contact = new Backbone.Model({
     firstName:'John',lastName:'Doe',phone:'1-111-1111'
});
 
//返回数据的数组/属性键
console.log(contact.keys()); //日志 ["firstName", "lastName", "phone"]
 
//返回数据的数组/属性值
console.log(contact.values()); //日志 ["John", "Doe", "1-111-1111"]
 
//复制数据/属性对象,返回包含选中键的对象
console.log(contact.pick('phone')); //日志 {phone="1-111-1111"}
 
//复制数据/属性对象,返回不包含选中键的对象
console.log(contact.omit('firstName','lastName')); // 日志 {phone="1-111-1111"}
```

## 监听模型change事件

当模型中的数据发生变化时，change事件会同时被广播，通常情况下一个视图能够监听此类事件。

在下面的代码中，模型创建之后，又创建了一个视图来监听模型上的change事件。模型数据的任何改变都将触发一个change事件，理想情况下，还会有一个重新渲染。

```javascript
var contact= new Backbone.Model();
 
var ContactView = Backbone.View.extend({
    initialize:function(){
        this.listenTo(contact,'change',this.render); //listen to change event on model
    },
    render:function(){
        console.log('data changed, re-render');
    }
});
 
new ContactView();
 
contact.set({ //这将触发change事件
    firstName:'john',lastName:'Doe',phone:'111-111-1111'
});
 
contact.unset('phone'); //这将触发change事件
```

还可以只监听模型上一个特殊属性的变化，需要将属性名称和change事件指定给一个监听者（`change:[ATTRIBUTE]`）。比如，下面我将在原来的代码上加以变化，只对联系模型上的firstName属性改变加以监听。

```javascript
var contact= new Backbone.Model();
 
var ContactView = Backbone.View.extend({
    initialize:function(){
        //监听模型上的change事件
        this.listenTo(contact,'change:firstName',this.render);
    },
    render:function(){console.log('render a change, data changed');}
});
 
new ContactView();
//change事件被激活，因为我们只监听firstName
contact.set('firstName','john'); 
contact.set('phone','222-222-2222'); //no change event trigger
```

## 利用hasChanged()和changedAttributes()验证一个模型已变化与变化的内容

hasChanged()和changedAttributes()模型方法能够验证在最后一个change事件之后变化是否已生效，并且验证具体是什么发生了变化。

在下面代码中，我设置了一个联系模型，然后立即改变电话号码属性。

```javascript
//创建联系模型,用数据实例化模型时并没有change事件被激活
var contact=new Backbone.Model({firstName:'John',lastName:'Doe',phone:'1-111-1111'});
 
//做出一个改变
contact.set({phone:'2-222-2222'});
 
//验证一个变化已经发生
console.log(contact.hasChanged()); //logs true
 
//获取已改变的属性
console.log(contact.changedAttributes()); //logs {phone="2-222-2222"}
```

代码中，通过改变电话号码，内部change事件被立即调用了，hasChanged()方法返回一个布尔函数表示模型已经发生了改变。为了得到包含该属性的发生改变的一个对象，需要在模型上调用changedAttibutes()方法。

## 利用previous()与previousAttributes()获取原始属性值

previous()和previousAttributes()方法能够用来获取change事件之前的一个属性值。在下面的代码中，我设置了一个联系模型，更改了phone和firstName属性，然后利用previous()和previousAttributes()方法检索号码属性的前值，以及最后change事件之前的所有模型属性状态。 

```javascript
//创建联系模型,用数据实例化模型时没有change事件被激活
var contact=new Backbone.Model({firstName:'John',lastName:'Doe',phone:'111-111-1111'});
 
//做出一个改变
contact.set({phone:'2-222-2222',firstName:'Jane'});
 
//获取电话号码的初始值
console.log(contact.previous('phone')); //日志 111-111-1111
 
//获取最后change事件之前的所有属性状态
console.log(contact.previousAttributes()); //日志 {firstName:"John",lastName:"Doe",phone:"1
```

## 在模型设置或存储之前验证模型数据

当设置或存储模型数据（在下一篇文章中将讨论存储）之前，一个验证函数将被调用来验证数据质量。

默认情况下，validate属性还未定义。在模型上为了定义一个验证函数，可以传递validate:function(attributes,options){}到extend()，或者直接更新模型实例上的validate属性。一个验证错误跳闸，就是简单的从一个接收false的函数返回任意值。

在下面的代码中，我为电话号码设置了一个验证函数，确保任意无效的电话号码将不会被set()。

```javascript
var contact = new Backbone.Model({
    firstName:'John',lastName:'Doe',phone:0
});
 
contact.validate = function(attributes,options){
    var validPhone = /\(?\d{3}\W?\s?\d{3}\W?\d{4}/.test(attributes.phone); 
    if(!validPhone){
        返回'Setting or Saving Invalid Phone Number Attempted';
    }
}
 
contact.set('phone','111-111-1111',{validate:true}); //set
contact.set('phone','111-1-1111',{validate:true}); //不会set,验证失败
 
console.log(contact.get('phone')); //没有无效的电话号码
console.log(contact.validationError); //读取最后一个验证错误
```

从验证函数最后一个返回的值如果不是false，则可以引用模型validationError属性。代码中我们从验证函数返回一个无效的信息，并访问validationError属性，后台输出这个信息。

*提示：*

1. 一个validate回调函数将所有模型属性作为第一个参数传递，第二个参数包含set()或save()选项对象可以验证跳闸。
2. 验证只发生在使用save()、set()方法，与validation:true选项，或者利用isValid()进行手动验证。

## 监听一个模型的invalid事件

当一个模型的validate函数失败，嵌入invalid事件将被广播。在下面的代码中，我演示了监听这个事件并输出参数传递给无效的回调函数。

```javascript
var contact = new Backbone.Model({firstName:'John',lastName:'Doe'});
 
contact.validate = function(attributes,options){
    var validPhone = /\(?\d{3}\W?\s?\d{3}\W?\d{4}/.test(attributes.phone); 
    if(!validPhone){返回'Setting or Saving Invalid Phone Number Attempted';}
};
 
//Backbone在联系模型上监听无效事件
Backbone.listenTo(contact,'invalid',function(model,error,options){
    console.log(model,error,options);
});
 
//设置无效电话号码触发无效事件
contact.set('phone','111-1-1111',{validate:true}); //不会set,验证失败
```

## 在模型上手动运行validate 

validate函数能够通过调用isValid()方法被手动调用。在下面的代码中，validate函数在继承Backbone.model构造函数时被设置，因此所有模型实例都能使用这个验证函数。在创建模型实例过程中，为了保证数据都被验证了，我在调用initialize时将运行validate函数，来获取通过了的无效数据。

```javascript
var ContactModel = Backbone.Model.extend({ //extend Backbone.Model
    validate :function(attributes,options){
        var phone = /\(?\d{3}\W?\s?\d{3}\W?\d{4}/.test(attributes.phone);
        var firstName = /^[A-Z]'?[a-zA-Z]+(-[a-zA-Z]+)?$/.test(attributes.firstName);
        var lastName = /^[A-Z]'?[a-zA-Z]+(-[a-zA-Z]+)?$/.test(attributes.lastName);
        if(!phone || !firstName || !lastName){
            return 'Setting, Saving, Or Seeding Invalid Data'
        }
    },
    initialize:function(){
        //运行验证, 如果无效将输出信息
        if(!this.isValid()){console.log(this.validationError)}
    }
});
var contact1Model = new ContactModel({ //validate seeded data
    firstName:'jo234 hn',lastName:'ao321-- e',phone:'111-1111-111111'
});
```

请注意，isValid()方法返回一个有用的布尔函数，显示模式是否有效。

*提示：*

* save()和set()在内部使用验证函数。