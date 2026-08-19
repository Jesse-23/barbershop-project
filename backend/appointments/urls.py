from django.urls import path
from .views import (
    AppointmentListCreateView, 
    AdminStatsView, 
    AdminAppointmentListView, 
    AdminAppointmentDetailView
)

urlpatterns = [
    path('appointments/', AppointmentListCreateView.as_view(), name='appointment-list-create'),

    # Admin Endpoints
    path('admin/stats/', AdminStatsView.as_view(), name='admin-stats'),
    path('admin/appointments/', AdminAppointmentListView.as_view(), name='admin-appointment-list'),
    path('admin/appointments/<int:pk>/', AdminAppointmentDetailView.as_view(), name='admin-appointment-detail'),
]