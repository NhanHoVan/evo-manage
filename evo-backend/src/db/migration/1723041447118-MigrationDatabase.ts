import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationDatabase1723041447118 implements MigrationInterface {
    name = 'MigrationDatabase1723041447118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."projects_status_enum" AS ENUM('Pending', 'In Progress', 'Completed', 'On Hold', 'Cancelled', 'Planning', 'Review', 'Approved', 'Rejected', 'Start')`);
        await queryRunner.query(`CREATE TYPE "public"."projects_type_enum" AS ENUM('Software', 'Research', 'Maintenance', 'Training', 'Marketing', 'Infrastructure')`);
        await queryRunner.query(`CREATE TABLE "projects" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "code" character varying(6) NOT NULL, "organization_id" uuid NOT NULL, "description" character varying(1000) NOT NULL, "start_date" TIMESTAMP WITH TIME ZONE, "end_date" TIMESTAMP WITH TIME ZONE, "project_manager_id" uuid NOT NULL, "status" "public"."projects_status_enum" NOT NULL DEFAULT 'Start', "type" "public"."projects_type_enum" NOT NULL, "tags" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" uuid NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" uuid NOT NULL, CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tickets_status_enum" AS ENUM('Open', 'In Progress', 'Done', 'Closed', 'Pending', 'Reviewing')`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(12) NOT NULL, "project_id" uuid NOT NULL, "title" character varying(255) NOT NULL, "description" character varying(1000) NOT NULL, "status" "public"."tickets_status_enum" NOT NULL DEFAULT 'Open', "start_date" TIMESTAMP WITH TIME ZONE, "due_date" TIMESTAMP WITH TIME ZONE, "story_points" integer, "assignee_id" uuid, "sprint" character varying(100), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" uuid NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" uuid NOT NULL, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."tasks_status_enum" AS ENUM('Open', 'In Progress', 'Done', 'Closed', 'Pending', 'Reviewing')`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying(12) NOT NULL, "ticket_id" uuid NOT NULL, "title" character varying(60) NOT NULL, "description" character varying(1000) NOT NULL, "status" "public"."tasks_status_enum" NOT NULL DEFAULT 'Open', "start_date" TIMESTAMP WITH TIME ZONE, "due_date" TIMESTAMP WITH TIME ZONE, "story_points" integer, "assignee_id" uuid, "sprint" character varying(100), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by" uuid NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_by" uuid NOT NULL, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_status_enum"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TYPE "public"."tickets_status_enum"`);
        await queryRunner.query(`DROP TABLE "projects"`);
        await queryRunner.query(`DROP TYPE "public"."projects_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."projects_status_enum"`);
    }

}
