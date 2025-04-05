from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.

class CreateUserView(generics.CreateAPIView):#auto create a new user from django
    queryset = User.objects.all()
    serializer_class = UserSerializer #Data to accept to create the user
    permission_classes = [AllowAny] # Who can create a new user(anyone)