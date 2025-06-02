# 🧾 CHANGELOG

> Track of all changes made to the Pay Confirmed backend codebase.

---

## [1.0.0] - 2025-06-02

### ✨ Added
- Initial project setup with `Express.js`, `PostgreSQL (Neon)`, and `dotenv` config.
- Business, employee, and payroll models using Sequelize.
- Authentication with `JWT` and bcrypt password hashing.
- CRUD controllers for users, businesses, employees, and payroll.
- JWT middleware and auth utilities for protected routes.
- Environment-based config setup with `.env` support.
- Sequelize PostgreSQL connection via `index.js`.
- Basic API routes for `/auth`, `/users`, `/payroll`, `/business`.

### 📝 Documentation
- `README.md` with project overview, installation, and setup.
- `auth.md` API documentation created in `docs/`.

---

## [Upcoming Releases]

### 🚧 Planned Features
- Email verification and password reset.
- Admin and role-based access control.
- Multi-business user linking.
- Paystub PDF generation and download.
- Webhooks for payment integration.
- API rate limiting and logging.

---

## [Conventions]

- This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
- Semantic versioning: `MAJOR.MINOR.PATCH`
