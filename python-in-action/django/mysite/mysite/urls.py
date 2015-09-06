from django.conf.urls import patterns, include, url
from django.contrib import admin
from tastypie.api import Api
from blog.api.resources import EntryResource,UserResource

v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(EntryResource())

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'mysite.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

	url(r'^blog/', include('blog.urls',namespace="blog")),
    url(r'^api/', include(v1_api.urls)),
    url(r'^admin/', include(admin.site.urls)),
)
