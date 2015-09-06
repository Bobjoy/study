from django.contrib.auth.models import User
from tastypie.authorization import Authorization
from tastypie import fields
from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from blog.models import Entry

class UserResource(ModelResource):
	class Meta:
		queryset = User.objects.all();
		resource_name = 'user'
		excludes = ['email','password','is_active','is_staff','is_superuser']
		authorization = Authorization()
		filtering = {
			'username': ALL,
		}

class EntryResource(ModelResource):
	user = fields.ForeignKey(UserResource, 'user')
	class Meta:
		queryset = User.objects.all();
		resource_name = 'entry'
		authorization = Authorization()
		filtering = {
			'user': ALL_WITH_RELATIONS,
			'pub_date': ['exact','lt','lte','gte','gt'],
		}

