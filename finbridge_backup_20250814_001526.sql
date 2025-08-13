--
-- PostgreSQL database dump
--

-- Dumped from database version 15.13
-- Dumped by pg_dump version 15.13

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: finbridge_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO finbridge_user;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: finbridge_user
--

COMMENT ON SCHEMA public IS '';


--
-- Name: DocumentType; Type: TYPE; Schema: public; Owner: finbridge_user
--

CREATE TYPE public."DocumentType" AS ENUM (
    'AADHAR_CARD',
    'PAN_CARD',
    'BANK_STATEMENT',
    'INCOME_PROOF',
    'ADDRESS_PROOF',
    'PASSPORT',
    'DRIVING_LICENSE',
    'UTILITY_BILL',
    'SALARY_SLIP',
    'ITR'
);


ALTER TYPE public."DocumentType" OWNER TO finbridge_user;

--
-- Name: InsuranceType; Type: TYPE; Schema: public; Owner: finbridge_user
--

CREATE TYPE public."InsuranceType" AS ENUM (
    'LIFE',
    'HEALTH',
    'MOTOR',
    'HOME',
    'TRAVEL'
);


ALTER TYPE public."InsuranceType" OWNER TO finbridge_user;

--
-- Name: InvestmentStatus; Type: TYPE; Schema: public; Owner: finbridge_user
--

CREATE TYPE public."InvestmentStatus" AS ENUM (
    'ACTIVE',
    'PAUSED',
    'COMPLETED',
    'CANCELLED'
);


ALTER TYPE public."InvestmentStatus" OWNER TO finbridge_user;

--
-- Name: InvestmentType; Type: TYPE; Schema: public; Owner: finbridge_user
--

CREATE TYPE public."InvestmentType" AS ENUM (
    'SIP',
    'LUMP_SUM',
    'EQUITY',
    'DEBT',
    'HYBRID',
    'ELSS'
);


ALTER TYPE public."InvestmentType" OWNER TO finbridge_user;

--
-- Name: KYCStatus; Type: TYPE; Schema: public; Owner: finbridge_user
--

CREATE TYPE public."KYCStatus" AS ENUM (
    'PENDING',
    'UNDER_REVIEW',
    'VERIFIED',
    'REJECTED',
    'INCOMPLETE'
);


ALTER TYPE public."KYCStatus" OWNER TO finbridge_user;

--
-- Name: LoanStatus; Type: TYPE; Schema: public; Owner: finbridge_user
--

CREATE TYPE public."LoanStatus" AS ENUM (
    'PENDING',
    'UNDER_REVIEW',
    'APPROVED',
    'DISBURSED',
    'ACTIVE',
    'CLOSED',
    'REJECTED',
    'DEFAULTED'
);


ALTER TYPE public."LoanStatus" OWNER TO finbridge_user;

--
-- Name: LoanType; Type: TYPE; Schema: public; Owner: finbridge_user
--

CREATE TYPE public."LoanType" AS ENUM (
    'HOME',
    'PERSONAL',
    'BUSINESS',
    'EDUCATION',
    'VEHICLE',
    'MORTGAGE'
);


ALTER TYPE public."LoanType" OWNER TO finbridge_user;

--
-- Name: PolicyStatus; Type: TYPE; Schema: public; Owner: finbridge_user
--

CREATE TYPE public."PolicyStatus" AS ENUM (
    'ACTIVE',
    'EXPIRED',
    'CANCELLED',
    'LAPSED',
    'CLAIM_PENDING'
);


ALTER TYPE public."PolicyStatus" OWNER TO finbridge_user;

--
-- Name: TransactionStatus; Type: TYPE; Schema: public; Owner: finbridge_user
--

CREATE TYPE public."TransactionStatus" AS ENUM (
    'PENDING',
    'PROCESSING',
    'SUCCESS',
    'FAILED',
    'CANCELLED',
    'REFUNDED'
);


ALTER TYPE public."TransactionStatus" OWNER TO finbridge_user;

--
-- Name: TransactionType; Type: TYPE; Schema: public; Owner: finbridge_user
--

CREATE TYPE public."TransactionType" AS ENUM (
    'LOAN_EMI',
    'INSURANCE_PREMIUM',
    'INVESTMENT_SIP',
    'INVESTMENT_LUMP_SUM',
    'LOAN_DISBURSEMENT',
    'INSURANCE_CLAIM',
    'REFUND'
);


ALTER TYPE public."TransactionType" OWNER TO finbridge_user;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: finbridge_user
--

CREATE TYPE public."UserRole" AS ENUM (
    'USER',
    'ADMIN',
    'KYC_OFFICER',
    'LOAN_OFFICER',
    'SUPPORT'
);


ALTER TYPE public."UserRole" OWNER TO finbridge_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: finbridge_user
--

CREATE TABLE public.audit_logs (
    id text NOT NULL,
    "userId" text,
    action text NOT NULL,
    resource text NOT NULL,
    "resourceId" text,
    "oldValues" jsonb,
    "newValues" jsonb,
    "ipAddress" text,
    "userAgent" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.audit_logs OWNER TO finbridge_user;

--
-- Name: documents; Type: TABLE; Schema: public; Owner: finbridge_user
--

CREATE TABLE public.documents (
    id text NOT NULL,
    "userId" text NOT NULL,
    type public."DocumentType" NOT NULL,
    "fileName" text NOT NULL,
    "fileUrl" text NOT NULL,
    "fileSize" integer NOT NULL,
    "mimeType" text NOT NULL,
    status text DEFAULT 'pending'::text NOT NULL,
    "verifiedAt" timestamp(3) without time zone,
    "verifiedBy" text,
    "rejectedReason" text,
    "uploadedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.documents OWNER TO finbridge_user;

--
-- Name: insurance_policies; Type: TABLE; Schema: public; Owner: finbridge_user
--

CREATE TABLE public.insurance_policies (
    id text NOT NULL,
    "userId" text NOT NULL,
    type public."InsuranceType" NOT NULL,
    "policyNumber" text NOT NULL,
    "coverageAmount" numeric(15,2) NOT NULL,
    "premiumAmount" numeric(10,2) NOT NULL,
    "premiumFrequency" text NOT NULL,
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    status public."PolicyStatus" DEFAULT 'ACTIVE'::public."PolicyStatus" NOT NULL,
    "nomineeName" text,
    "nomineeRelation" text,
    "nomineeAge" integer,
    features jsonb,
    exclusions jsonb
);


ALTER TABLE public.insurance_policies OWNER TO finbridge_user;

--
-- Name: investments; Type: TABLE; Schema: public; Owner: finbridge_user
--

CREATE TABLE public.investments (
    id text NOT NULL,
    "userId" text NOT NULL,
    type public."InvestmentType" NOT NULL,
    "fundName" text NOT NULL,
    "fundCode" text,
    category text NOT NULL,
    amount numeric(15,2) NOT NULL,
    units numeric(15,4),
    nav numeric(10,4),
    "currentValue" numeric(15,2),
    "sipAmount" numeric(10,2),
    "sipDate" integer,
    "sipFrequency" text,
    status public."InvestmentStatus" DEFAULT 'ACTIVE'::public."InvestmentStatus" NOT NULL,
    "startDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "maturityDate" timestamp(3) without time zone,
    "lastTransactionDate" timestamp(3) without time zone
);


ALTER TABLE public.investments OWNER TO finbridge_user;

--
-- Name: loans; Type: TABLE; Schema: public; Owner: finbridge_user
--

CREATE TABLE public.loans (
    id text NOT NULL,
    "userId" text NOT NULL,
    "loanType" public."LoanType" NOT NULL,
    amount numeric(15,2) NOT NULL,
    tenure integer NOT NULL,
    "interestRate" numeric(5,2) NOT NULL,
    "emiAmount" numeric(10,2),
    "processingFee" numeric(10,2),
    status public."LoanStatus" DEFAULT 'PENDING'::public."LoanStatus" NOT NULL,
    purpose text,
    "monthlyIncome" numeric(12,2),
    "employmentType" text,
    "companyName" text,
    "workExperience" integer,
    "applicationDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "approvalDate" timestamp(3) without time zone,
    "disbursalDate" timestamp(3) without time zone,
    "closureDate" timestamp(3) without time zone,
    "creditScore" integer,
    "riskCategory" text,
    "approvedBy" text,
    "rejectedReason" text
);


ALTER TABLE public.loans OWNER TO finbridge_user;

--
-- Name: notifications; Type: TABLE; Schema: public; Owner: finbridge_user
--

CREATE TABLE public.notifications (
    id text NOT NULL,
    "userId" text NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    type text NOT NULL,
    channel text NOT NULL,
    read boolean DEFAULT false NOT NULL,
    "readAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.notifications OWNER TO finbridge_user;

--
-- Name: otps; Type: TABLE; Schema: public; Owner: finbridge_user
--

CREATE TABLE public.otps (
    id text NOT NULL,
    "userId" text NOT NULL,
    code text NOT NULL,
    type text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    used boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.otps OWNER TO finbridge_user;

--
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: finbridge_user
--

CREATE TABLE public.refresh_tokens (
    id text NOT NULL,
    token text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.refresh_tokens OWNER TO finbridge_user;

--
-- Name: system_configurations; Type: TABLE; Schema: public; Owner: finbridge_user
--

CREATE TABLE public.system_configurations (
    id text NOT NULL,
    key text NOT NULL,
    value text NOT NULL,
    description text,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.system_configurations OWNER TO finbridge_user;

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: finbridge_user
--

CREATE TABLE public.transactions (
    id text NOT NULL,
    "userId" text NOT NULL,
    type public."TransactionType" NOT NULL,
    amount numeric(15,2) NOT NULL,
    status public."TransactionStatus" DEFAULT 'PENDING'::public."TransactionStatus" NOT NULL,
    "paymentMethod" text,
    "gatewayTransactionId" text,
    "gatewayResponse" jsonb,
    "loanId" text,
    "investmentId" text,
    "policyId" text,
    "scheduledDate" timestamp(3) without time zone,
    "processedDate" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.transactions OWNER TO finbridge_user;

--
-- Name: users; Type: TABLE; Schema: public; Owner: finbridge_user
--

CREATE TABLE public.users (
    id text NOT NULL,
    email text NOT NULL,
    "emailVerified" boolean DEFAULT false NOT NULL,
    "emailVerifiedAt" timestamp(3) without time zone,
    "passwordHash" text NOT NULL,
    role public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL,
    "firstName" text NOT NULL,
    "lastName" text NOT NULL,
    phone text NOT NULL,
    "phoneVerified" boolean DEFAULT false NOT NULL,
    "dateOfBirth" timestamp(3) without time zone,
    gender text,
    "addressLine1" text,
    "addressLine2" text,
    city text,
    state text,
    pincode text,
    country text DEFAULT 'India'::text NOT NULL,
    "kycStatus" public."KYCStatus" DEFAULT 'PENDING'::public."KYCStatus" NOT NULL,
    "kycCompletedAt" timestamp(3) without time zone,
    "panNumber" text,
    "aadharNumber" text,
    "isActive" boolean DEFAULT true NOT NULL,
    "isBlocked" boolean DEFAULT false NOT NULL,
    "blockedReason" text,
    "blockedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "lastLoginAt" timestamp(3) without time zone
);


ALTER TABLE public.users OWNER TO finbridge_user;

--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: finbridge_user
--

COPY public.audit_logs (id, "userId", action, resource, "resourceId", "oldValues", "newValues", "ipAddress", "userAgent", "createdAt") FROM stdin;
\.


--
-- Data for Name: documents; Type: TABLE DATA; Schema: public; Owner: finbridge_user
--

COPY public.documents (id, "userId", type, "fileName", "fileUrl", "fileSize", "mimeType", status, "verifiedAt", "verifiedBy", "rejectedReason", "uploadedAt") FROM stdin;
\.


--
-- Data for Name: insurance_policies; Type: TABLE DATA; Schema: public; Owner: finbridge_user
--

COPY public.insurance_policies (id, "userId", type, "policyNumber", "coverageAmount", "premiumAmount", "premiumFrequency", "startDate", "endDate", status, "nomineeName", "nomineeRelation", "nomineeAge", features, exclusions) FROM stdin;
\.


--
-- Data for Name: investments; Type: TABLE DATA; Schema: public; Owner: finbridge_user
--

COPY public.investments (id, "userId", type, "fundName", "fundCode", category, amount, units, nav, "currentValue", "sipAmount", "sipDate", "sipFrequency", status, "startDate", "maturityDate", "lastTransactionDate") FROM stdin;
\.


--
-- Data for Name: loans; Type: TABLE DATA; Schema: public; Owner: finbridge_user
--

COPY public.loans (id, "userId", "loanType", amount, tenure, "interestRate", "emiAmount", "processingFee", status, purpose, "monthlyIncome", "employmentType", "companyName", "workExperience", "applicationDate", "approvalDate", "disbursalDate", "closureDate", "creditScore", "riskCategory", "approvedBy", "rejectedReason") FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: finbridge_user
--

COPY public.notifications (id, "userId", title, message, type, channel, read, "readAt", "createdAt") FROM stdin;
\.


--
-- Data for Name: otps; Type: TABLE DATA; Schema: public; Owner: finbridge_user
--

COPY public.otps (id, "userId", code, type, "expiresAt", used, "createdAt") FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: finbridge_user
--

COPY public.refresh_tokens (id, token, "expiresAt", "userId", "createdAt") FROM stdin;
\.


--
-- Data for Name: system_configurations; Type: TABLE DATA; Schema: public; Owner: finbridge_user
--

COPY public.system_configurations (id, key, value, description, "isActive", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: finbridge_user
--

COPY public.transactions (id, "userId", type, amount, status, "paymentMethod", "gatewayTransactionId", "gatewayResponse", "loanId", "investmentId", "policyId", "scheduledDate", "processedDate", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: finbridge_user
--

COPY public.users (id, email, "emailVerified", "emailVerifiedAt", "passwordHash", role, "firstName", "lastName", phone, "phoneVerified", "dateOfBirth", gender, "addressLine1", "addressLine2", city, state, pincode, country, "kycStatus", "kycCompletedAt", "panNumber", "aadharNumber", "isActive", "isBlocked", "blockedReason", "blockedAt", "createdAt", "updatedAt", "lastLoginAt") FROM stdin;
cmeaazt9p0000135xha9lzfdi	debug-test@example.com	f	\N	$2a$12$RgGG/s7UCi9TXEqiAJI8VO8dxm9UhEYqPHa4h2Xe23Dxe4Cn8Giiq	USER	Debug	Test	9876543210	f	\N	\N	\N	\N	\N	\N	\N	India	PENDING	\N	\N	\N	t	f	\N	\N	2025-08-13 18:28:11.628	2025-08-13 18:28:11.628	\N
cmeab4vh10001135xbchpsmvw	kumar@gmail.com	f	\N	$2a$12$hnXRbYPoNHn1F7mszvhu1OcjyjnYEc/KMl1O/1vRGTQD1RTxkUw/.	USER	Kumar	Kumar	9182346790	f	\N	\N	\N	\N	\N	\N	\N	India	PENDING	\N	\N	\N	t	f	\N	\N	2025-08-13 18:32:07.764	2025-08-13 18:32:07.764	\N
\.


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (id);


--
-- Name: documents documents_pkey; Type: CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT documents_pkey PRIMARY KEY (id);


--
-- Name: insurance_policies insurance_policies_pkey; Type: CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.insurance_policies
    ADD CONSTRAINT insurance_policies_pkey PRIMARY KEY (id);


--
-- Name: investments investments_pkey; Type: CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.investments
    ADD CONSTRAINT investments_pkey PRIMARY KEY (id);


--
-- Name: loans loans_pkey; Type: CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.loans
    ADD CONSTRAINT loans_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: otps otps_pkey; Type: CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.otps
    ADD CONSTRAINT otps_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: system_configurations system_configurations_pkey; Type: CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.system_configurations
    ADD CONSTRAINT system_configurations_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: insurance_policies_policyNumber_key; Type: INDEX; Schema: public; Owner: finbridge_user
--

CREATE UNIQUE INDEX "insurance_policies_policyNumber_key" ON public.insurance_policies USING btree ("policyNumber");


--
-- Name: refresh_tokens_token_key; Type: INDEX; Schema: public; Owner: finbridge_user
--

CREATE UNIQUE INDEX refresh_tokens_token_key ON public.refresh_tokens USING btree (token);


--
-- Name: system_configurations_key_key; Type: INDEX; Schema: public; Owner: finbridge_user
--

CREATE UNIQUE INDEX system_configurations_key_key ON public.system_configurations USING btree (key);


--
-- Name: users_aadharNumber_key; Type: INDEX; Schema: public; Owner: finbridge_user
--

CREATE UNIQUE INDEX "users_aadharNumber_key" ON public.users USING btree ("aadharNumber");


--
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: finbridge_user
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- Name: users_panNumber_key; Type: INDEX; Schema: public; Owner: finbridge_user
--

CREATE UNIQUE INDEX "users_panNumber_key" ON public.users USING btree ("panNumber");


--
-- Name: users_phone_key; Type: INDEX; Schema: public; Owner: finbridge_user
--

CREATE UNIQUE INDEX users_phone_key ON public.users USING btree (phone);


--
-- Name: audit_logs audit_logs_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: documents documents_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.documents
    ADD CONSTRAINT "documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: insurance_policies insurance_policies_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.insurance_policies
    ADD CONSTRAINT "insurance_policies_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: investments investments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.investments
    ADD CONSTRAINT "investments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: loans loans_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.loans
    ADD CONSTRAINT "loans_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: notifications notifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: otps otps_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.otps
    ADD CONSTRAINT "otps_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: transactions transactions_investmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "transactions_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES public.investments(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: transactions transactions_loanId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "transactions_loanId_fkey" FOREIGN KEY ("loanId") REFERENCES public.loans(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: transactions transactions_policyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "transactions_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES public.insurance_policies(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: transactions transactions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: finbridge_user
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: finbridge_user
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

