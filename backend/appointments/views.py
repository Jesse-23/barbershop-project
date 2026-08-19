from rest_framework import generics, permissions
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserRegistrationSerializer, AppointmentSerializer
from .models import Appointment

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        # Include the user's name in the login response
        data['name'] = self.user.name or self.user.email.split('@')[0]
        data['email'] = self.user.email
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class AppointmentListCreateView(generics.ListCreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Users should only see their own appointments
        return Appointment.objects.filter(user=self.request.user).order_by('-date', '-time')

    def perform_create(self, serializer):
        # Automatically tie the appointment to the logged-in user
        serializer.save(user=self.request.user)

# --- Add this permission class ---
class IsAdminOrOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        # Allows access if the user is a Django staff member or matches your jessemaduka85 username
        if not request.user or not request.user.is_authenticated:
            return False
            
        username = request.user.name or request.user.email.split('@')[0]
        return request.user.is_staff or username == "jessemaduka85"

# --- Add these Admin Views ---
class AdminStatsView(APIView):
    permission_classes = [IsAdminOrOwner]

    def get(self, request):
        appointments = Appointment.objects.all()
        
        total_bookings = appointments.count()
        pending = appointments.filter(status='Pending').count()
        completed = appointments.filter(status='Completed').count()
        
        # Temporary mock revenue (assuming an average $35 cut) until prices are added to the database
        revenue = completed * 35 
        
        return Response({
            "total_bookings": total_bookings,
            "pending_approval": pending,
            "completed": completed,
            "revenue": revenue
        })

class AdminAppointmentListView(generics.ListAPIView):
    queryset = Appointment.objects.all().order_by('-date', '-time')
    serializer_class = AppointmentSerializer
    permission_classes = [IsAdminOrOwner]

class AdminAppointmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAdminOrOwner]