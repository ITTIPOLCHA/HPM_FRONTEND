# เลือก base image ที่มี Node.js ติดตั้งแล้ว
FROM node:16-alpine

# ตั้งค่า working directory ใน container
WORKDIR /app

# คัดลอกไฟล์ package.json และ package-lock.json (หรือ yarn.lock) เข้าไปใน container
COPY package.json package-lock.json ./

# ติดตั้ง dependencies ของโปรเจกต์ React
RUN npm install

# คัดลอกทุกไฟล์จากโปรเจกต์ไปยัง container
COPY . .

# ตั้งค่าสภาพแวดล้อมและพอร์ต
ENV NODE_ENV=production
EXPOSE 3000

# Build โปรเจกต์ React
RUN npm run build:serve:dev

# ตั้งค่าคำสั่งที่จะรันเมื่อ container เริ่มต้น
CMD ["npm", "start"]
