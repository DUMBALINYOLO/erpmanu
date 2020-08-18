from rest_framework import serializers
from drf_writable_nested.serializers import WritableNestedModelSerializer
from event.models import (
				PlannerConfig,
				Event,
				EventParticipant,
			)


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value



class EventConfigSerializer(serializers.ModelSerializer):

	class Meta:
		model = PlannerConfig
		fields = "__all__"



class EventParticipantListDetailSerializer(serializers.ModelSerializer):
	participant_type = serializers.SerializerMethodField()
	employee = StringSerializer()
	customer = StringSerializer()
	supplier = StringSerializer()
	event = StringSerializer()

	class Meta:
		model = EventParticipant
		fields = [
			'id',
			'participant_type',
			'employee',
			'customer',
			'supplier',
			'event'
		]

	def get_participant_type(self, obj):
		return obj.get_participant_type_display()



class EventParticipantCreateUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = EventParticipant
		fields = [
			'participant_type',
			'employee',
			'customer',
			'supplier',
			'event'
		]


class EventCreateUpdateSerializer(WritableNestedModelSerializer):
	participants = EventParticipantCreateUpdateSerializer(many=True)

	class Meta:
		model = Event
		fields =[
			'date',
			'reminder',
			'completed',
			'completion_time',
			'start_time',
			'end_time',
			'priority',
			'description',
			'repeat',
			'repeat_active',
			'label',
			'icon',
			'owner',
			'participants',
		]


class EventListSerializer(serializers.ModelSerializer):
	owner = StringSerializer()
	start_time = serializers.SerializerMethodField()
	end_time = serializers.SerializerMethodField()

	class Meta:
		model = Event
		fields = [
			'id',
			'date',
			'start_time',
			'end_time',
			'owner',
		]

	def get_start_time(self, obj):
		return obj.get_start_time_display()

	def get_end_time(self, obj):
		return obj.get_end_time_display()


class EventDetailSerializer(serializers.ModelSerializer):
	owner = StringSerializer()
	start_time = serializers.SerializerMethodField()
	end_time = serializers.SerializerMethodField()
	repeat = serializers.SerializerMethodField()
	reminder = serializers.SerializerMethodField()
	icon = serializers.SerializerMethodField()
	priority = serializers.SerializerMethodField()
	participants = EventParticipantCreateUpdateSerializer(many=True, read_only=True)

	class Meta:
		model = Event
		fields = [
			'id',
			'date',
			'start_time',
			'end_time',
			'owner',
			'reminder',
			'completed',
			'completion_time',
			'priority',
			'description',
			'repeat',
			'repeat_active',
			'label',
			'icon',
			'participants',

		]

	def get_start_time(self, obj):
		return obj.get_start_time_display()

	def get_end_time(self, obj):
		return obj.get_end_time_display()

	def get_icon(self, obj):
		return obj.get_icon_display()


	def get_repeat(self, obj):
		return obj.get_repeat_display()


	def get_priority(self, obj):
		return obj.get_priority_display()


	def get_reminder(self, obj):
		return obj.get_reminder_display()



