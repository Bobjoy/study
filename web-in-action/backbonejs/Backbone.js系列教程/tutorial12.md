# Backbone.js系列教程十二：Backbone.Collection

> http://www.gbtags.com/gb/share/2002.htm

## Backbone.Collection概述

一个Backbone集合表示了一组模型逻辑有序的组合，并提供使用（组合，分类，过滤）这些模型组的方法与属性。在本文中为了说明这样的联系关系（模型=表单中的一行有标签的联系数据），你可以把一个集合看做是整张表单，其中包含了很多行联系数据。下面我更新了表单中联系内容的细节，在上一章节开头我们讲述过，于是整张表单能够被当作一个联系表单。

![](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-25/lxbd.jpg)

当然，一个Backbone.Collection不仅仅是一个像之前表单表现的那种标签。集合还可以捕捉模型以及集合上被触发的事件（改变，摧毁，请求，同步，错误，无效）。它本身还包含一系列有用的事件（添加，移除，从新设置，分类，请求，同步）。

*提示：*

* 在最简单的形式中，一个集合是一个包含了模型实例引用的数组。事实上，每个集合实例提供了一个models属性，作为一个直接引用到内部模型实例数组。

## 由模型实例创建一个Backbone.Collection

为了创建一个通用集合，我们只需要由Backbone.Collection实例化一个实例，再传入一行模型实例。在下面的代码中，我创建了前一节讨论过的那种联系模型，并作为第一选择项传递给一个集合。

```javascript
var contact1Model = new Backbone.Model({
    firstName: 'John',
    lastName: 'Doe',
    phone: '1-111-1111'
});
 
var contact2Model = new Backbone.Model({
    firstName: 'Jane',
    lastName: 'Doe',
    phone: '2-222-2222'
});
//创建一个集合，传入两个模型
var contacts = new Backbone.Collection([contact1Model, contact2Model]);
 
console.log(contacts.models); //日志，后台输出包含模型的数组
```

*提示：*

1. 实例化一个集合时传递的第一个参数可以是一个模型实例或一组模型实例。然而，如果所创建的集合拥有一个模型构造函数的引用（通过model属性），那么该集合就可以通过传递一个原始属性/数据对象或一组原始属性/数据对象，在内部实例化模型。
2. 第二个参数传递给集合构造函数是一个选项对象用来配置url,model,comparater选项。
3. 与Backbone.View 和 Backbone.Model类似，一个Backbone.Collection被扩展（子分类）利用extend()并且定义一个initialize函数，当集合被创建后，调用该初始化函数。
4. clone()方法规定通过克隆一个集合实例可以创建集合对象。当使用clone()时，一个包含同样模型的新的集合实例将返回。
5. length属性在集合实例上可用，维持该集合所包含模型的个数。
6. 当在集合中添加一个模型时，模型的collection属性会自动更新并包含该集合的引用。

## 由一个模型构造函数创建Backbone.Collection

创建集合的通用模式是将该集合的model属性指向一个模型构造函数，然后并不需要传入一组模型实例的引用，该集合本身就能由原始数据实例化模型，并将这些实例存储在集合中。

在下面的代码中，实例化一个集合时，一组原始数据和一个模型构造函数（ContactModel）被传递给Backbone.Collection构造函数。

```javascript
var ContactModel = Backbone.Model.extend({ //继承Backbone.Model
    defaults: {firstName : 'no first name yet',lastName : 'no last name yet'}
});
 
var contactData = [
    {firstName: 'John',lastName: 'Doe',phone: '1-111-1111'}, 
    {firstName: 'Jane',lastName: 'Doe',phone: '2-222-2222'}
];
 
//由模型构造函数和数据创建一个集合
var contacts = new Backbone.Collection(contactData,{model:ContactModel});
 
console.log(contacts.models); //日志，输出包含模型的数组
```

这与传入一个引用到已创建的模型结果是完全一样的，但是通过使用model属性，集合可以为我们完成一些设置步骤。

*提示：*

1. model属性还可以在子分类Backbone.Collection构造函数过程中被设置（ContactsCollection = Backbone.Collections.extend({model:modelConstructor})。
2. model属性要么可以指向一个模型构造函数，要么可以成为一个函数值返回一个模型实例。

## Backbone.Collection的方法、属性以及事件

Backbone.Collection集合实例有以下[方法和属性](http://backbonejs.org/#View)：

* model
* models
* toJSON
* sync
* Underscore Methods (28)
* add
* remove
* reset
* set
* get
* at
* push
* pop
* unshift
* shift
* slice
* length
* comparator
* sort
* pluck
* where
* findWhere
* url
* parse
* clone
* fetch
* create

粗体显示的方法或属性不会在本文叙述，在以后的文章中我们会讨论到这些与同步相关的方法或属性。

此外，集合可以利用以下嵌入事件：

![](http://7xkexv.dl1.z0.glb.clouddn.com/15-9-25/qrsj2.jpg)

*提示：*

* 由于集合包含了模型，所以模型上被触发的事件同样可以在集合上被触发，这就意味着你可以在一个集合上监听（`contacts.on('change',function(model,options){})`一个模型的change, `change[:attribute]`, destroy, error, invalid事件。

## 使用 toJSON()得到一个集合上所有的模型数据/属性

集合的toJSON()方法将返回一个数组，包含了集合中每个模型的内部属性副本。在下面的代码中，我使用toJSON()输出一个数组，包含了集合中每个模型的所有属性。

```javascript
var contactData = [
    {firstName: 'John',lastName: 'Doe',phone: '1-111-1111'}, 
    {firstName: 'Jane',lastName: 'Doe',phone: '2-222-2222'}
];
 
//由模型构造函数和数据创建出一个集合
var contacts = new Backbone.Collection(contactData,{model:Backbone.Model});
 
console.log(contacts.toJSON());
 
/*以上的日志: 
[{firstName="John", lastName="Doe", ...}, {firstName="Jane", lastName="Doe", ...}]*/
```

## 利用models, get(), at(), where(), findWhere()由一个集合获取模型

models属性提供直接访问一组数据，包含模型到集合的所有引用。我们在前面的小节已经使用了这种属性，但是为了演示它的值，在下面的代码中，演示了利用models属性由一个集合提取一组模型实例（即模型对象）。

```javascript
var contactData = [
    {firstName: 'John',lastName: 'Doe',phone: '1-111-1111'}, 
    {firstName: 'Jane',lastName: 'Doe',phone: '2-222-2222'},
    {firstName: 'Cody',lastName: 'Lindley',phone: '3-333-3333'}
];
 
var contacts = new Backbone.Collection(contactData,{model:Backbone.Model});
    
//该模型属性提供访问到一个集合中存储模型的数组
console.log(contacts.models);
```

where()方法提供模型数组能够被属性过滤。在下面的代码中，我利用where()得到集合中只包含{firstName:'Doe'}属性的一组模型。

```javascript
var contactData = [
    {firstName: 'John',lastName: 'Doe',phone: '1-111-1111'}, 
    {firstName: 'Jane',lastName: 'Doe',phone: '2-222-2222'},
    {firstName: 'Cody',lastName: 'Lindley',phone: '3-333-3333'},
];
 
var contacts = new Backbone.Collection(contactData,{model:Backbone.Model});
    
//使用where(),从联系人中返回只包含john和jane的模型
console.log(contacts.where({lastName:'Doe'}));
```

使用get(), at(),findWhere()集合方法，我们可以得到一个单一模型引用，而不是一组模型引用。在下面的代码中我将演示这三种方法。

```javascript
var contact1Model = new Backbone.Model({id:01,FirstName: 'John',lastName: 'Doe',phone: '1-111-1111'
});
var contacts = new Backbone.Collection(contact1Model);
//以下全部返回一个引用到联系人集合中的contact1Model
//使用get()
console.log(contacts.get(contact1Model));
console.log(contacts.get(01));
console.log(contacts.get('c1'));
 
//使用at()
console.log(contacts.at(0));
 
//使用findWhere()
console.log(contacts.findWhere({lastName:'Doe'}));
 
//注意每一个方法返回一个引用到contact1Model
console.log(contacts.get(contact1Model) === contact1Model);
console.log(contacts.get(01) === contact1Model);
console.log(contacts.get('c1') === contact1Model);
console.log(contacts.at(0) === contact1Model);
console.log(contacts.findWhere({lastName:'Doe'}) === contact1Model);
```

*提示：*

1. 应当避免通过直接改变模型排列来操纵一个集合模块，否则将不会触发add或remove这类事件。
2. findWhere()将会返回第一个集合中匹配的值。
3. at()的功能是在集合上对模型进行整理排序，或根据插入顺序返回模型。
4. 集合的slice()方法，是models.slice(begin,end)的[简要表达形式](http://backbonejs.org/docs/backbone.html#section-98)。

## 集合排序

默认情况下，集合本身不能自己排序。模型只是按照它们被添加时的顺序简单排列。为了让一个集合按照特定顺序排列，应当定义comparator属性，如果作为一个 [sortBy](http://underscorejs.org/#sortBy)函数只接受一个参数，如果作为一个[sort](http://www.gbtags.com/gb/share/&)函数将接收两个参数，或者作为一个表明属性排序的字符串。在下面的代码中，我们在集合创建过程中传递比较器值，于是集合就可以把模型按照firstname排序。

```javascript
var ContactModel = Backbone.Model.extend();
 
var contactData = [
    {firstName: 'John',lastName: 'Doe',phone: '1-111-1111'}, 
    {firstName: 'Jane',lastName: 'Doe',phone: '2-222-2222'},
    {firstName: 'Cody',lastName: 'Lindley',phone: '3-333-3333'}
];
 
var contacts = new Backbone.Collection(contactData,{
    model:ContactModel,
    comparator: 'firstName' //让模型按照firstName的顺序排序
});
    
console.log( //日志，输出Cody Jane John,注意这不是添加时的顺序
    contacts.models[0].get('firstName'),
    contacts.models[1].get('firstName'),
    contacts.models[2].get('firstName')
);
```

*提示：*

1. 一个集合的变化（即add()）将自动调用由comparator定义的排序逻辑。然而，如果一个模型的属性发生变化，则需要手动利用sort()方法排序，使集合更新以及正确排序。
2. 在集合上调用sort()将触发一个排序事件。
3. 比较器值能够在创建集合之后被设定，方法是为集合的比较器值定义一个排序值（即sort、sortBy函数，或排序属性）。

## 在集合中利用Pluck()获取每个模型的模型属性数组与属性值数组

Pluck()方法用在创建模型集合中一个特定属性的所有属性值数组是非常好用的。比如，在下面的代码中，我设立了一个包含了三个模型的集合，所有模型都带有firstName属性。我在集合上调用pluck('firstName') 方法来提取每个模型的firstname值。

```javascript
var contactA = new Backbone.Model({firstName: 'Luke'});
var contactB = new Backbone.Model({firstName: 'John'});
var contactC = new Backbone.Model({firstName: 'Bill'});
 
var contacts = new Backbone.Collection([contactA,contactB,contactC]);
 
//日志["Luke", "John", "Bill"],注意该顺序与添加时的顺序一样
console.log(contacts.pluck('firstName'));
```

## 利用add(), push(), unshift()在一个集合中添加模型

add()方法用于在一个集合中添加模型并添加一个单一的模型实例或一组模型实例。如果为集合的模型属性设置一个值，你可以传递原始数据/属性对象，或者一组原始数据/属性对象。在下面的代码中，我演示了利用这些方法在集合中添加模型。

```javascript
var contactA = new Backbone.Model({firstName: 'Luke'});
var contactB = new Backbone.Model({firstName: 'John'});
var contactC = new Backbone.Model({firstName: 'Bill'});
var contactsD = [{firstName: 'Jane'},{firstName: 'Cody'}];
var contacts = new Backbone.Collection([],{model:Backbone.Model});
 
//添加数据/属性对象
contacts.add({firstName: 'Jill'});
//添加一组数据/属性对象contacts.add(contactsD);
//添加模型实例
contacts.add(contactA);
//添加一组模型实例
contacts.add([contactB,contactC]);
 
//日志 ["Jill", "Jane", "Cody", "Luke", "John", "Bill"]
console.log(contacts.pluck('firstName'));
```

push() 和 unshift()方法函数等同于add()方法，并接收相同的参数，只不过push() 和 unshift() 方法一个是在集合末端（push()）添加模型，另一个是在集合初始(unshift())添加模型。

*提示：*

1. \{at: index\}选项作为第二个参数传递到add()，将在集合特定索引位置拼接上该模型。
2. 在集合中加入两次同一个模型是无效的，该模型会被忽略，除非你将{merge:true}选项作为第二个参数传递到add()方法。如果合并发生，模型和集合上都将会有change事件被触发。
3. 当在集合上添加，推送或转换一个模型时，add事件将被触发。

## 利用remove(), pop(), shift()从一个集合上删除模型

remove()方法能被用来从集合上删除模型，通过传递所需删除模型的引用。下面我将演示从一个集合删除一个单一模型或几个模型的方法。

```javascript
var contacts = new Backbone.Collection([
    {firstName: 'Luke'},{firstName: 'John'},
    {firstName: 'Bill'},{firstName: 'Jill'}
],{model:Backbone.Model});
 
//从集合上删除Luke模型
contacts.remove(contacts.findWhere({firstName:'Luke'}));
//删除一组模型实例
contacts.remove([
    contacts.findWhere({firstName:'John'}),
    contacts.findWhere({firstName:'Bill'})
]);
 
//验证模型已经被删除
console.log(contacts.pluck('firstName')); //logs ["Jill"], Luke, John, Bill were removed
```

pop() 和shift()是删除模型的便捷方式。调用pop()将删除集合中最后一个模型，掉用shift()将删除集合中第一个模型。

*提示：*

1. 调用不包含参数的remove()，不会删除所有的模型。如果需要删除所有的模型，则应该调用不包含参数的reset()。
2. 当remove(), pop(), shift()被调用时，一个remove事件将被触发。

## 利用set()同时添加、合并以及删除模型

set()方法能够更新集合中模型的状态，通过匹配传递给set()方法的模型实例数组表现出的变化。也就是说利用set()方法将尝试同步传入的模型数组与集合内部模型的状态，通过智能破译差异，并根据差异进行添加、删除、合并。

在以下代码中，我设置了一个集合，并利用集合中的set()删除一个模型，再更新一个模型。

```javascript
var contacts = new Backbone.Collection([
    {firstName: 'John',lastName: 'Doe',phone: '111-111-1111'}, 
    {firstName: 'Jane',lastName: 'Doe',phone: '222-222-2222'},
],{model:Backbone.Model});
    
console.log(JSON.stringify(contacts.toJSON())); //check current model attributes
    
//增加Bill Doe,删除Jane Doe,更新John Doe
contacts.set([
    {firstName: 'Bill',lastName: 'Doe',phone: '333-333-3333'}, 
    {firstName: 'Jane', middleName: 'Roe', lastName: 'Doe',phone: '555-555-5555'}
]);
//验证变化
console.log(JSON.stringify(contacts.toJSON()));
```

*提示：*

1. 当对模型和集合对象使用set()时，将会同时触发add, remove, change事件。
2. 你可以通过传递{add: false}, {remove: false}, 或者 {merge: false}选项给set()，令它的添加、删除、合并功能不起作用。

## 在一个集合中使用reset()来替换所有模型（即批量替换/重置）

使用rese()方法可以在一个集合中用一个（或一系列）新的模型取代原有的模型。这实际上类似于把集合中原有模型删除，再添加新的模型。

*提示：*

1. 调用不带任何参数的reset()将从集合中删除所有模型。
2. 在使用reset()方法时，一个重置事件时被触发。

## 在集合模型中使用underscore.js（或 lodash.js) 方法

一个集合实例可以有许多有的用法来操作该集合实例所包含的模型数组。但是请注意，Backbone把以下的这些underscore.js (或 lodash.js)方法混合到集合的原型链中，这些方法也都很有用（myCollectionInstance.first()与myCollectionInstance.at(0)相同）。

* forEach or each
* map or collect
* reduce or foldl or inject)
* reduceRight or foldr
* find or detect
* filter or select
* reject
* every or all
* some or any
* contains or include
* invoke
* max
* min
* sortBy
* groupBy
* sortedIndex
* shuffle
* toArray
* size
* first or head or take
* initial
* rest or tail
* last
* without
* indexOf
* lastIndexOf
* isEmpty
* chain

在下面代码示例中，我使用了each() 和 first()。

```javascript
var contactData = [
    {firstName: 'John',lastName: 'Doe',phone: '111-111-1111'}, 
    {firstName: 'Jane',lastName: 'Doe',phone: '222-222-2222'},
];
 
var contacts = new Backbone.Collection(contactData,{model:Backbone.Model});
    
//在集合中循环遍历每个模型,记录其属性值
contacts.each(function(model){
    console.log(model.values());
});
//在集合中获取第一个模型,记录其属性值
console.log(contacts.first().values());
```