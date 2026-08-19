from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Appointment

# We use get_user_model to dynamically reference your custom User model
User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    # Specify the fields we want to include for registration
    class Meta:
        model = User
        fields = ['email', 'phone', 'password', 'name']
        # Very important: ensure the password field is write-only for security
        extra_kwargs = {'password': {'write_only': True}}

    # Override the default create method to use our CustomUserManager's create_user method
    def create(self, validated_data):
        # This ensures the password gets correctly hashed
        user = User.objects.create_user(**validated_data)
        return user


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['id', 'service', 'barber', 'date', 'time', 'notes', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']