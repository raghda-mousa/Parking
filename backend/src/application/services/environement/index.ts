import { logi } from "@boost";
export class EnvironementService {
    private static logger = logi(__filename);
    public static validate = () => {
        if (!process.env.DB_URL) {
            this.logger.error('DB_URL variable must be defined');
        }
        if (!process.env.JWT_TOKEN_SECRET) {
            this.logger.error('JWT_TOKEN_SECRET variable must be defined');
        }
    }
    public static get dbConfig() {
        return {
            db_url: process.env.DB_URL
        }
    }
    public static get jwtConfig() {
        return {
            secret: process.env.JWT_TOKEN_SECRET!
        }
    }
}