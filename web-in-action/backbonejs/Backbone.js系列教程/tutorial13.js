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
                this.$el.append('<li><span>' + contact.getName() + '</span>' + ' / ' + contact.get('phone') + '<button type="button" class="btn-xs btn-danger removeContactBtn">X</button></li>');
            }, this);
        }
    }
});
var contactListViewInstance = new ContactListView();