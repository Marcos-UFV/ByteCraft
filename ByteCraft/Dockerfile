# =========================
# STAGE 1 - FRONTEND
# =========================
FROM node:22-alpine AS frontend-build

WORKDIR /frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend .

RUN npm run build


# =========================
# STAGE 2 - BACKEND
# =========================
FROM maven:3.9.6-eclipse-temurin-17 AS backend-build

WORKDIR /backend

COPY backend .

# Copia frontend buildado
COPY --from=frontend-build /frontend/dist ./src/main/resources/static

RUN mvn clean package -DskipTests


# =========================
# STAGE 3 - RUNTIME
# =========================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=backend-build /backend/target/app.war app.war

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.war"]