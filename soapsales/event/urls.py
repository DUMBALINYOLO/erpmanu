from django.urls import path
from rest_framework.routers import DefaultRouter

from event.apis import (
		EventConfigViewSet,
		UpcomingEventViewSet,
		CompletedEventViewSet
	)

router =  DefaultRouter()

router.register(r'upcoming-events', UpcomingEventViewSet, basename='upcoming-events')
router.register(r'completed-events', CompletedEventViewSet, basename='completed-events')

router.register(r'event-config', EventConfigViewSet)

urlpatterns = router.urls 

