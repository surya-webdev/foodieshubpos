-- CreateTable
CREATE TABLE "starters" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT DEFAULT '',
    "type" TEXT DEFAULT 'veg',
    "price" REAL DEFAULT 0,
    "typedish" TEXT,

    CONSTRAINT "starters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maincourse" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "type" TEXT DEFAULT 'veg',
    "typedish" TEXT,
    "price" REAL,

    CONSTRAINT "maincourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "soups" (
    "id" BIGSERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "type" TEXT DEFAULT 'veg',
    "typedish" TEXT,
    "price" REAL,

    CONSTRAINT "soups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT,
    "password" TEXT,
    "id" UUID NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dashboard" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "day" DATE DEFAULT CURRENT_TIMESTAMP,
    "sale" REAL,
    "typedish" TEXT DEFAULT '{}',

    CONSTRAINT "dashboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_userName_key" ON "user"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");
