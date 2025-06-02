# 🗃️ Pay Confirmed — Database Schema (PostgreSQL)

This document outlines the current database schema for **Pay Confirmed**, designed for secure, scalable, and tax-compliant payroll management.

---

## 🔧 Overview

- **Database Engine**: PostgreSQL
- **Host**: Neon.tech (Cloud-native)
- **ORM**: Query Builder / pg (Node.js)
- **Security**: Environment-managed connection string, SSL enforced

---

## 🏢 Table: `businesses`

| Column Name       | Type         | Constraints                 |
|-------------------|--------------|-----------------------------|
| id                | UUID         | Primary Key, auto-gen       |
| business_name     | VARCHAR(255) | NOT NULL                    |
| ein               | VARCHAR(20)  | UNIQUE, NOT NULL            |
| control_number    | VARCHAR(50)  | NOT NULL                    |
| federal_tax_id    | VARCHAR(50)  | NOT NULL                    |
| state_tax_id      | VARCHAR(50)  | NOT NULL                    |
| business_address  | TEXT         |                             |
| created_at        | TIMESTAMP    | DEFAULT NOW()               |

---

## 👨‍💼 Table: `users`

| Column Name    | Type         | Constraints                      |
|----------------|--------------|----------------------------------|
| id             | UUID         | Primary Key, auto-gen            |
| business_id    | UUID         | Foreign Key → businesses(id)     |
| full_name      | VARCHAR(255) | NOT NULL                         |
| email          | VARCHAR(255) | UNIQUE, NOT NULL                 |
| password_hash  | TEXT         | NOT NULL                         |
| role           | VARCHAR(20)  | ENUM: ['admin', 'employer', 'employee'] |
| created_at     | TIMESTAMP    | DEFAULT NOW()                    |

---

## 💵 Table: `paystubs`

| Column Name    | Type          | Constraints                    |
|----------------|---------------|--------------------------------|
| id             | UUID          | Primary Key, auto-gen          |
| user_id        | UUID          | Foreign Key → users(id)        |
| gross_pay      | NUMERIC(10,2) | NOT NULL                       |
| net_pay        | NUMERIC(10,2) | NOT NULL                       |
| tax_deductions | NUMERIC(10,2) | NOT NULL                       |
| pay_period     | DATERANGE     | NOT NULL                       |
| issued_at      | TIMESTAMP     | DEFAULT NOW()                  |

---

## 📂 Table: `payments`

| Column Name    | Type          | Constraints                    |
|----------------|---------------|--------------------------------|
| id             | UUID          | Primary Key, auto-gen          |
| business_id    | UUID          | Foreign Key → businesses(id)   |
| paystub_id     | UUID          | Foreign Key → paystubs(id)     |
| status         | VARCHAR(20)   | ENUM: ['pending', 'completed'] |
| issued_by      | UUID          | Foreign Key → users(id)        |
| issued_at      | TIMESTAMP     | DEFAULT NOW()                  |

---

## 🔒 Table: `sessions` (optional - for JWT/refresh)

| Column Name    | Type         | Constraints                      |
|----------------|--------------|----------------------------------|
| id             | UUID         | Primary Key, auto-gen            |
| user_id        | UUID         | Foreign Key → users(id)          |
| token          | TEXT         | NOT NULL                         |
| expires_at     | TIMESTAMP    | NOT NULL                         |

---

## 🧪 Relationships Summary

- A **Business** has many **Users**
- A **User** can generate many **Paystubs**
- **Paystubs** are linked to **Payments**
- Admin/employer roles are assigned through `users.role`

---

## 📌 Notes

- All `UUID` keys generated via `uuid_generate_v4()`
- Secure hashing used for passwords (`bcrypt`)
- Pay periods stored in `daterange` format for flexibility
- Support for scaling via partitioned paystub/payment tables (future enhancement)

---

## 🛠️ Future Tables

- `audit_logs` for tracking user/admin activity
- `notifications` for payroll alerts
- `benefits` for tax-related perks, insurance, PTO, etc.

---

## 📬 Questions?

Reach out to:  
**Marquez Ross** — *Founder, Jardin d'Été LLC*  
**Email**: marquez.ross@myyahoo.com
