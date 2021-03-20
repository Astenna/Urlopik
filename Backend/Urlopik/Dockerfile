FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY Urlopik.sln ./
COPY Urlopik/*.csproj ./Urlopik/
COPY Urlopik.Application/*.csproj ./Urlopik.Application/
COPY Urlopik.Persistence/*.csproj ./Urlopik.Persistence/
RUN dotnet restore

COPY . .
WORKDIR /src/Urlopik.Persistence
RUN dotnet build  -c Release -o /app

WORKDIR /src/Urlopik.Application
RUN dotnet build  -c Release -o /app

WORKDIR /src/Urlopik
RUN dotnet build -c Release -o /app

FROM build AS publish
RUN dotnet publish -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "Urlopik.dll"]