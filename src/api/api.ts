import { HttpResponse, http } from "msw";
import { setupWorker } from "msw/browser";
import { getData, saveData } from './services';
import { DocumentType } from "../interfaceTypes";

export const worker = setupWorker(
    http.get("/api/data", async () => {
        const data = await getData();
        return HttpResponse.json(data);
    }),
    http.post("/api/data", async ({ request }) => {
        const json = await request.json();
        const data = json as DocumentType[];
        saveData(data)
        return HttpResponse.json({ status: true, newdata: data });
    }),
)
