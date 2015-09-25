/// <reference path="../../.tsd/backbone/backbone.d.ts" />
/// <reference path="../../.tsd/underscore/underscore.d.ts" />

'use strict';

console.info('>>>>子类与创建一个Backbone.Model');
/**
 * 子类与创建一个Backbone.Model
 */
var contact1Model = new Backbone.Model(
    {firstName:'John',lastName:'Doe',phone:'111-111-1111'}
);
 
var contact2Model = new Backbone.Model(
    {firstName:'Jane',lastName:'Doe',phone:'222-222-2222'}
);

console.log(Object.keys(contact1Model))
console.log(Object.keys(contact1Model.attributes))

var ContactModel = Backbone.Model.extend({ //extend Backbone.Model
    getFullName:function(){
        return this.get('firstName') +' '+ this.get('lastName');
    }
});
 
var contact1Model = new ContactModel( //instantiate ContactModel instance
    {firstName:'John',lastName:'Doe',phone:'111-111-1111'}
);
 
var contact2Model = new ContactModel( //instantiate ContactModel instance
    {firstName:'Jane',lastName:'Danel',phone:'222-222-2222'}
);
 
//在我们的模型上调用getFullName方法
console.log(contact1Model.getFullName()); //logs John Doe
console.log(contact2Model.getFullName()); //logs Jane Doe

console.info('>>>>Backbone.Model方法、属性与事件');
/**
 * Backbone.Model方法、属性与事件
 */
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

// 如果你想让实例不引用同一个默认对象，你可以提供一个默认函数值，将会创造出特殊的默认值（不引用同一个默认对象）。
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

console.info('>>>>模型数据的设置、更改、获取、复原与删除');
/**
 * 模型数据的设置、更改、获取、复原与删除
 */
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

console.info('>>>>访问一个模型数据/属性');
/**
 * 访问一个模型数据/属性
 */
var contact1Model = new Backbone.Model( //instantiate model instance
    {firstName:'John',lastName:'Doe'}
);
 
console.log(contact1Model.attributes); //日志 {firstName="John", lastName="Doe"}

console.info('>>>>利用toJSON()获取模型数据/属性的一个副本');
/**
 * 利用toJSON()获取模型数据/属性的一个副本
 */
var contact1Model = new Backbone.Model( //实例化模型实例
    {firstName:'John',lastName:'Doe'}
);
 
console.log(contact1Model.toJSON()); //日志 {firstName="John", lastName="Doe"}
 
//请注意，这不是一个引用，而是属性对象的一个副本
//i.e.
console.log(contact1Model.toJSON === contact1Model.attributes); //日志 false

console.info('>>>>过滤模型数据');
/**
 * 过滤模型数据
 */
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

console.info('>>>>监听模型change事件');
/**
 * 监听模型change事件
 */
var contact= new Backbone.Model();
 
var ContactView = Backbone.View.extend({
    initialize:function(){
        this.listenTo(contact,'change',this.render); //listen to change event on model
    },
    render:function(e){
        //console.log(e)
        console.log('data changed, re-render');
    }
});
 
new ContactView();
 
contact.set({ //这将触发change事件
    firstName:'john',lastName:'Doe',phone:'111-111-1111'
});
 
contact.unset('phone'); //这将触发change事件

// 只监听模型上一个特殊属性的变化，需要将属性名称和change事件指定给一个监听者（'change:[ATTRIBUTE]'）
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

console.info('>>>>利用hasChanged()和changedAttributes()验证一个模型已变化与变化的内容');
/**
 * 利用hasChanged()和changedAttributes()验证一个模型已变化与变化的内容
 */
//创建联系模型,用数据实例化模型时并没有change事件被激活
var contact=new Backbone.Model({firstName:'John',lastName:'Doe',phone:'1-111-1111'});
 
//做出一个改变
//contact.set({phone:'2-222-2222'});
contact.set({phone:'1-111-1111'});
 
//验证一个变化已经发生
console.log(contact.hasChanged()); //logs true
 
//获取已改变的属性
console.log(contact.changedAttributes()); //logs {phone="2-222-2222"}

console.info('>>>>利用previous()与previousAttributes()获取原始属性值')
/**
 * 利用previous()与previousAttributes()获取原始属性值
 */
//创建联系模型,用数据实例化模型时没有change事件被激活
var contact=new Backbone.Model({firstName:'John',lastName:'Doe',phone:'111-111-1111'});
 
//做出一个改变
contact.set({phone:'2-222-2222',firstName:'Jane', lastName: 'Doe'});
 
//获取电话号码的初始值
console.log(contact.previous('phone')); //日志 111-111-1111
console.log(contact.previous('lastName'))
 
//获取最后change事件之前的所有属性状态
console.log(contact.previousAttributes()); //日志 {firstName:"John",lastName:"Doe",phone:"1

console.info('>>>>在模型设置或存储之前验证模型数据')
/**
 * 在模型设置或存储之前验证模型数据
 */
var contact = new Backbone.Model({
    firstName:'John',lastName:'Doe',phone:0
});
 
contact.validate = function(attributes,options){
    var validPhone = /\(?\d{3}\W?\s?\d{3}\W?\d{4}/.test(attributes.phone); 
    if(!validPhone){
        return 'Setting or Saving Invalid Phone Number Attempted';
    }
}
 
contact.set('phone','111-111-1111',{validate:true}); //set
contact.set('phone','111-1-1111',{validate:true}); //不会set,验证失败
 
console.log(contact.get('phone')); //没有无效的电话号码
console.log(contact.validationError); //读取最后一个验证错误

console.info('>>>>监听一个模型的invalid事件')
/**
 * 监听一个模型的invalid事件
 */
var contact = new Backbone.Model({firstName:'John',lastName:'Doe'});
 
contact.validate = function(attributes,options){
    var validPhone = /\(?\d{3}\W?\s?\d{3}\W?\d{4}/.test(attributes.phone); 
    if(!validPhone){return 'Setting or Saving Invalid Phone Number Attempted';}
};
 
//Backbone在联系模型上监听无效事件
Backbone.listenTo(contact,'invalid',function(model,error,options){
    console.log(model,error,options);
});
 
//设置无效电话号码触发无效事件
contact.set('phone','111-1-1111',{validate:true}); //不会set,验证失败

console.info('>>>>在模型上手动运行validate')
/**
 * 在模型上手动运行validate
 */
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