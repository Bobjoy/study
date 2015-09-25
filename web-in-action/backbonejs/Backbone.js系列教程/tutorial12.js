/// <reference path="../../.tsd/backbone/backbone.d.ts" />
/// <reference path="../../.tsd/underscore/underscore.d.ts" />

'use strict';

console.info('>>>>由模型实例创建一个Backbone.Collection');
/**
 * 由模型实例创建一个Backbone.Collection
 */
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

console.info('>>>>由一个模型构造函数创建Backbone.Collection');
/**
 * 由一个模型构造函数创建Backbone.Collection
 */
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

console.info('>>>>使用 toJSON()得到一个集合上所有的模型数据/属性');
/**
 * 使用 toJSON()得到一个集合上所有的模型数据/属性
 */
var contactData = [
    {firstName: 'John',lastName: 'Doe',phone: '1-111-1111'}, 
    {firstName: 'Jane',lastName: 'Doe',phone: '2-222-2222'}
];
 
//由模型构造函数和数据创建出一个集合
var contacts = new Backbone.Collection(contactData,{model:Backbone.Model});
 
console.log(contacts.toJSON());
 
/*以上的日志: 
[{firstName="John", lastName="Doe", ...}, {firstName="Jane", lastName="Doe", ...}]*/

console.info('>>>>利用models, get(), at(), where(), findWhere()由一个集合获取模型');
/**
 * 利用models, get(), at(), where(), findWhere()由一个集合获取模型
 */
var contactData = [
    {firstName: 'John',lastName: 'Doe',phone: '1-111-1111'}, 
    {firstName: 'Jane',lastName: 'Doe',phone: '2-222-2222'},
    {firstName: 'Cody',lastName: 'Lindley',phone: '3-333-3333'}
];
 
var contacts = new Backbone.Collection(contactData,{model:Backbone.Model});
    
//该模型属性提供访问到一个集合中存储模型的数组
console.log(contacts.models);

// where()方法提供模型数组能够被属性过滤
var contactData = [
    {firstName: 'John',lastName: 'Doe',phone: '1-111-1111'}, 
    {firstName: 'Jane',lastName: 'Doe',phone: '2-222-2222'},
    {firstName: 'Cody',lastName: 'Lindley',phone: '3-333-3333'},
];
 
var contacts = new Backbone.Collection(contactData,{model:Backbone.Model});
    
//使用where(),从联系人中返回只包含john和jane的模型
console.log(contacts.where({lastName:'Doe'}));

var contact1Model = new Backbone.Model({id:1,FirstName: 'John',lastName: 'Doe',phone: '1-111-1111'
});
var contacts = new Backbone.Collection(contact1Model);
//以下全部返回一个引用到联系人集合中的contact1Model
//使用get()
console.log('--使用get()')
console.log(contacts.get(contact1Model));
console.log(contacts.get(1));
console.log(contacts.get('c13'));
 
//使用at()
console.log('--使用at()')
console.log(contacts.at(0));
 
//使用findWhere()
console.log('--使用findWhere()')
console.log(contacts.findWhere({lastName:'Doe'}));
 
//注意每一个方法返回一个引用到contact1Model
console.log(contacts.get(contact1Model) === contact1Model);
console.log(contacts.get(1) === contact1Model);
console.log(contacts.get('c13') === contact1Model);
console.log(contacts.at(0) === contact1Model);
console.log(contacts.findWhere({lastName:'Doe'}) === contact1Model);

console.info('>>>>集合排序')
/**
 * 集合排序
 */
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

console.info('>>>>在集合中利用Pluck()获取每个模型的模型属性数组与属性值数组')
/**
 * 在集合中利用Pluck()获取每个模型的模型属性数组与属性值数组
 */
var contactA = new Backbone.Model({firstName: 'Luke'});
var contactB = new Backbone.Model({firstName: 'John'});
var contactC = new Backbone.Model({firstName: 'Bill'});
 
var contacts = new Backbone.Collection([contactA,contactB,contactC]);
 
//日志["Luke", "John", "Bill"],注意该顺序与添加时的顺序一样
console.log(contacts.pluck('firstName'));

console.info('>>>>利用add(), push(), unshift()在一个集合中添加模型')
/**
 * 利用add(), push(), unshift()在一个集合中添加模型
 */
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

console.info('>>>>利用remove(), pop(), shift()从一个集合上删除模型')
/**
 * 利用remove(), pop(), shift()从一个集合上删除模型
 */
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

console.info('>>>>利用set()同时添加、合并以及删除模型')
/**
 * 利用set()同时添加、合并以及删除模型
 */
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

console.info('>>>>在一个集合中使用reset()来替换所有模型（即批量替换/重置）')
/**
 * 在一个集合中使用reset()来替换所有模型（即批量替换/重置）
 * 使用rese()方法可以在一个集合中用一个（或一系列）新的模型取代原有的模型。这实际上类似于把集合中原有模型删除，再添加新的模型。
 */

console.info('>>>>在集合模型中使用underscore.js（或 lodash.js) 方法')
/**
 * 在集合模型中使用underscore.js（或 lodash.js) 方法
 */
var contactData = [
    {firstName: 'John',lastName: 'Doe',phone: '111-111-1111'}, 
    {firstName: 'Jane',lastName: 'Doe',phone: '222-222-2222'},
];
 
var contacts = new Backbone.Collection(contactData,{model:Backbone.Model});
    
//在集合中循环遍历每个模型,记录其属性值
contacts.each(function(model){
    console.log(model.keys());
});
//在集合中获取第一个模型,记录其属性值
console.log(contacts.first().values());