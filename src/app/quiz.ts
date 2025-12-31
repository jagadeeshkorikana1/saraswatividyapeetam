import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastService } from './services/toast.service';

type Question = { id: number; q: string; options: string[]; correct: number };

@Component({
  standalone: true,
  selector: 'app-quiz',
  imports: [CommonModule],
  templateUrl: './quiz.html',
  styleUrls: ['./quiz.scss'],
})
export class Quiz {
  private router = inject(Router);
  private toast = inject(ToastService);

  // App state
  inQuiz = false;
  currentSectionId: string | null = null;

  // Answers/results
  answers = new Map<number, number>();
  submitted = false;
  submitting = false; // show progress while grading
  score = 0;
  results: Array<{ id: number; q: string; chosen: number | null; correct: number }> = [];

  // Define sections (6) each with 10 questions
  sections: Array<{ id: string; title: string; subtitle?: string; questions: Question[] }> = [
    {
      id: 'webapps',
      title: 'App Service (Web Apps)',
      subtitle: 'Host web apps and APIs',
      questions: [
        { id: 1, q: 'Which runtime is supported by Azure App Service for Linux?', options: ['IIS only', 'Node.js, Python, .NET, Java', 'Only PHP', 'Only Go'], correct: 1 },
        { id: 2, q: 'What feature automatically scales App Service plans?', options: ['AutoScale rules', 'App Slots', 'Managed Identity', 'Traffic Manager'], correct: 0 },
        { id: 3, q: 'What is deployment slot used for?', options: ['Version control', 'A/B deployments and warm swap', 'Database backup', 'Scaling out'], correct: 1 },
        { id: 4, q: 'Which service integrates with App Service for CI/CD?', options: ['Azure Pipelines', 'Azure Monitor', 'Azure Key Vault', 'Event Grid'], correct: 0 },
        { id: 5, q: 'Which plan lets you run multiple apps on shared resources?', options: ['Consumption Plan', 'App Service Plan', 'Dedicated VM', 'Function Plan'], correct: 1 },
        { id: 6, q: 'How do you provide TLS/SSL to custom domains in App Service?', options: ['Managed certificates or upload your own', 'Not supported', 'Only HTTP', 'Use FTP'], correct: 0 },
        { id: 7, q: 'What is "Always On" used for?', options: ['Keep app warm to avoid cold starts', 'Autoscale', 'Logging', 'Backups'], correct: 0 },
        { id: 8, q: 'Which feature isolates apps for security within App Service?', options: ['App Service Environment (ASE)', 'VNet Peering', 'Storage Account', 'CDN'], correct: 0 },
        { id: 9, q: 'How does App Service store application settings securely?', options: ['App Settings with encryption', 'Plain file in app', 'Key Vault not supported', 'Use environment variables only'], correct: 0 },
        { id: 10, q: 'Which option helps perform zero-downtime deployments?', options: ['Swap slots', 'Stop/start app', 'Scale up', 'Restart server'], correct: 0 },
      ]
    },
    {
      id: 'storage',
      title: 'Blob Storage',
      subtitle: 'Object storage for unstructured data',
      questions: [
        { id: 1, q: 'Which access tiers does Blob Storage support?', options: ['Hot, Cool, Archive', 'Only Hot', 'Cold and Frozen', 'Nearline'], correct: 0 },
        { id: 2, q: 'What is a container in Blob Storage?', options: ['A VM', 'A logical grouping for blobs', 'A database', 'A file server'], correct: 1 },
        { id: 3, q: 'Which protocol is commonly used to access blobs?', options: ['HTTP/HTTPS', 'FTP', 'SMTP', 'SSH'], correct: 0 },
        { id: 4, q: 'What provides immutability features for blobs?', options: ['Blob soft delete', 'Immutable storage (WORM)', 'Lifecycle policies only', 'Replication'], correct: 1 },
        { id: 5, q: 'Which redundancy option replicates data across regions?', options: ['LRS', 'ZRS', 'GRS/RA-GRS', 'None'], correct: 2 },
        { id: 6, q: 'What is SAS token used for?', options: ['Delegated limited access to storage', 'Encrypting blobs', 'Replication', 'Monitoring'], correct: 0 },
        { id: 7, q: 'Which blob type is optimized for large append operations?', options: ['Block blob', 'Append blob', 'Page blob', 'File blob'], correct: 1 },
        { id: 8, q: 'Which service supports static website hosting from storage?', options: ['Blob Storage', 'File Storage', 'Queue Storage', 'Table Storage'], correct: 0 },
        { id: 9, q: 'What is the maximum size of a single block blob upload using Put Blob?', options: ['256 MB', '4.75 TB', '50 MB', '100 GB'], correct: 1 },
        { id: 10, q: 'Which feature moves blobs between access tiers?', options: ['Lifecycle Management', 'Manual copy', 'Replication', 'Content Delivery Network'], correct: 0 },
      ]
    },
    {
      id: 'serverless',
      title: 'Functions & Logic Apps',
      subtitle: 'Serverless compute and workflows',
      questions: [
        { id: 1, q: 'What triggers an Azure Function?', options: ['HTTP, Timer, Queue, EventGrid', 'Only HTTP', 'Only Timer', 'Only Queue'], correct: 0 },
        { id: 2, q: 'Which plan is consumption-based for Functions?', options: ['Consumption Plan', 'App Service Plan', 'Premium Plan', 'Dedicated Plan'], correct: 0 },
        { id: 3, q: 'What is Logic Apps primarily for?', options: ['Orchestrating workflows and connectors', 'Hosting websites', 'Storing files', 'Monitoring'], correct: 0 },
        { id: 4, q: 'Which language is NOT supported by Functions runtime?', options: ['C#', 'JavaScript', 'Python', 'COBOL'], correct: 3 },
        { id: 5, q: 'How do Functions scale under load?', options: ['Platform-managed autoscale', 'Manual scaling only', 'Depends on VM size', 'No scaling'], correct: 0 },
        { id: 6, q: 'Which service handles durable orchestrations?', options: ['Durable Functions', 'Event Grid', 'Service Bus', 'API Management'], correct: 0 },
        { id: 7, q: 'Logic Apps uses connectors; what are they?', options: ['Prebuilt integrations to services', 'Custom code only', 'VM images', 'Storage accounts'], correct: 0 },
        { id: 8, q: 'Which monitoring tool is used for Functions?', options: ['Application Insights', 'Blob Storage', 'Table Storage', 'Traffic Manager'], correct: 0 },
        { id: 9, q: 'Which plan offers VNet integration for Functions?', options: ['Premium Plan', 'Consumption Plan', 'Free Plan', 'Dedicated Plan'], correct: 0 },
        { id: 10, q: 'What is the typical use-case for serverless?', options: ['Event-driven, short-lived compute', 'Long-running batch only', 'Only web hosting', 'Only databases'], correct: 0 },
      ]
    },
    {
      id: 'apim',
      title: 'API Management (APIM)',
      subtitle: 'Publish and manage APIs',
      questions: [
        { id: 1, q: 'APIM is used to', options: ['Manage, secure and expose APIs', 'Store blobs', 'Host VMs', 'Monitor networks'], correct: 0 },
        { id: 2, q: 'Which policy enforces rate limiting?', options: ['limit-rate', 'rate-limit-by-key', 'quota', 'cache-lookup'], correct: 1 },
        { id: 3, q: 'APIM developer portal is used for', options: ['API documentation and testing', 'Database management', 'VM provisioning', 'Storage config'], correct: 0 },
        { id: 4, q: 'APIM can transform requests using', options: ['Policies', 'Functions only', 'Logic Apps only', 'CDN'], correct: 0 },
        { id: 5, q: 'Which tier is suitable for production enterprise APIs?', options: ['Developer', 'Basic', 'Standard/Premium', 'Free'], correct: 2 },
        { id: 6, q: 'APIM supports which authentication methods?', options: ['JWT, OAuth2, subscription keys', 'Only basic auth', 'Only JWT', 'None'], correct: 0 },
        { id: 7, q: 'Can APIM front-end call backend services in a VNet?', options: ['Yes with VNet integration', 'No', 'Only on Windows', 'Only with CDN'], correct: 0 },
        { id: 8, q: 'Which artifact stores API definitions?', options: ['API entities in APIM', 'Blob Storage', 'Service Bus', 'Table Storage'], correct: 0 },
        { id: 9, q: 'APIM can provide analytics via', options: ['Built-in analytics and Application Insights', 'Only external tools', 'Only logs in storage', 'No analytics'], correct: 0 },
        { id: 10, q: 'How do you secure backend credentials in APIM?', options: ['Named values (Key Vault)', 'Hard-code in policy', 'Store in table', 'Send in query string'], correct: 0 },
      ]
    },
    {
      id: 'monitor',
      title: 'Monitor',
      subtitle: 'Observability and diagnostics',
      questions: [
        { id: 1, q: 'Azure Monitor collects', options: ['Metrics, logs, traces', 'Only metrics', 'Only logs', 'Only traces'], correct: 0 },
        { id: 2, q: 'What stores logs for queries?', options: ['Log Analytics workspace', 'Blob Storage', 'Table Storage', 'Event Grid'], correct: 0 },
        { id: 3, q: 'Which feature alerts on metric conditions?', options: ['Metric alerts', 'Autoscale', 'Diagnose and solve', 'Application Insights only'], correct: 0 },
        { id: 4, q: 'Application Insights is primarily for', options: ['Application performance and telemetry', 'Networking', 'Storage management', 'API management'], correct: 0 },
        { id: 5, q: 'Workbooks are used for', options: ['Visualizations and dashboards', 'Backups', 'Scaling', 'DNS'], correct: 0 },
        { id: 6, q: 'Which query language is used for logs?', options: ['Kusto Query Language (KQL)', 'SQL', 'Gremlin', 'GraphQL'], correct: 0 },
        { id: 7, q: 'Autoscale in Azure Monitor uses', options: ['Metric rules and actions', 'Manual scripts', 'Storage triggers', 'CDN'], correct: 0 },
        { id: 8, q: 'Diagnostic settings send platform logs to', options: ['Log Analytics/Storage/Event Hub', 'Only Log Analytics', 'Only Storage', 'Only Event Hub'], correct: 0 },
        { id: 9, q: 'Which tool helps detect anomalies in telemetry?', options: ['Application Insights Smart Detection', 'Azure Monitor Noisy Detector', 'Storage Analyzer', 'APIM Analyzer'], correct: 0 },
        { id: 10, q: 'Which product captures distributed traces?', options: ['Application Insights (Distributed Tracing)', 'Traffic Manager', 'Key Vault', 'Blob Storage'], correct: 0 },
      ]
    },
    {
      id: 'messaging',
      title: 'Messaging & Events',
      subtitle: 'Event Hubs, Service Bus, Event Grid',
      questions: [
        { id: 1, q: 'Which service is best for telemetry/event ingestion at massive scale?', options: ['Event Hubs', 'Service Bus', 'Event Grid', 'Storage Queue'], correct: 0 },
        { id: 2, q: 'Which service provides pub/sub with advanced messaging features?', options: ['Service Bus', 'Event Hubs', 'Blob Storage', 'Table Storage'], correct: 0 },
        { id: 3, q: 'Event Grid is optimized for', options: ['Event routing and subscription', 'Queueing', 'Blob storage', 'Hosting apps'], correct: 0 },
        { id: 4, q: 'Which has concept of topics and subscriptions?', options: ['Service Bus', 'Event Hubs', 'Event Grid', 'Storage Queue'], correct: 0 },
        { id: 5, q: 'Which service supports capture to storage for events?', options: ['Event Hubs', 'Service Bus', 'Event Grid', 'APIM'], correct: 0 },
        { id: 6, q: 'Which feature ensures at-least-once delivery for events?', options: ['Checkpointing & consumer groups', 'TTL only', 'Partitions only', 'Topics'], correct: 0 },
        { id: 7, q: 'Service Bus supports which messaging pattern?', options: ['Queues, Topics, Sessions', 'Only queues', 'Only topics', 'Only pub/sub'], correct: 0 },
        { id: 8, q: 'Which service is serverless event grid publisher?', options: ['Event Grid', 'Event Hubs', 'Service Bus', 'Logic Apps'], correct: 0 },
        { id: 9, q: 'Which service offers geo-replication for disaster recovery?', options: ['Event Hubs (GeoDR) and Service Bus Premium', 'Event Grid only', 'Storage only', 'None'], correct: 0 },
        { id: 10, q: 'Which SDK concept groups consumers for checkpoints?', options: ['Consumer group', 'Partition key', 'Subscription', 'Topic'], correct: 0 },
      ]
    }
  ];

  currentSectionTitle = '';

  get currentQuestions(): Question[] {
    if (!this.currentSectionId) return [];
    const s = this.sections.find((x) => x.id === this.currentSectionId);
    return s ? s.questions : [];
  }

  enterSection(sectionId: string) {
    this.currentSectionId = sectionId;
    const s = this.sections.find((x) => x.id === sectionId);
    this.currentSectionTitle = s ? s.title : '';
    this.inQuiz = true;
    this.answers.clear();
    this.submitted = false;
    this.submitting = false;
    this.score = 0;
    this.results = [];
    this.toast.show(`Starting ${this.currentSectionTitle}`, 'success');
  }

  select(qId: number, optionIdx: number) {
    this.answers.set(qId, optionIdx);
  }

  async submit() {
    if (this.submitting) return;
    this.submitting = true;
    try {
      // small delay so the progress UI is visible
      await new Promise((r) => setTimeout(r, 600));

      // Compute results and score
      this.results = this.currentQuestions.map((qq) => ({ id: qq.id, q: qq.q, chosen: this.answers.has(qq.id) ? (this.answers.get(qq.id) as number) : null, correct: qq.correct }));
      this.score = this.results.reduce((s, r) => (r.chosen === r.correct ? s + 1 : s), 0);
      this.submitted = true;

      // No persistence: show results and notify user
      this.toast.show('Quiz graded — results shown below', 'success');
    } catch (err) {
      console.error('Error during quiz submit', err);
      this.submitted = this.results.length > 0;
      this.toast.show('An error occurred while grading', 'error');
    } finally {
      this.submitting = false;
    }
  }

  // Helper to get letter label A, B, C... for option indices
  char(i: number) {
    return String.fromCharCode(65 + i);
  }

  backToHome() {
    this.inQuiz = false;
    this.currentSectionId = null;
    this.currentSectionTitle = '';

    // smooth scroll to top of page when returning home
    setTimeout(() => this.scrollToTop(), 50);
  }

  // Smooth scroll helpers used by template buttons
  scrollToTop() {
    const el = document.getElementById('quiz-main');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToBottom() {
    const el = document.getElementById('quiz-main');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'end' });
      return;
    }
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  // Share helpers for results
  linkedInShareUrl() {
    const title = encodeURIComponent(`I scored ${this.score}/${this.currentQuestions.length} on ${this.currentSectionTitle}`);
    const summary = encodeURIComponent(`I completed a Saraswati Vidya Peetam quiz on ${this.currentSectionTitle} and scored ${this.score}/${this.currentQuestions.length}.`);
    const url = encodeURIComponent(window.location.href);
    return `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`;
  }

  gmailShareUrl() {
    const subject = encodeURIComponent(`I scored ${this.score}/${this.currentQuestions.length} on ${this.currentSectionTitle}`);
    const body = encodeURIComponent(`I completed the Saraswati Vidya Peetam quiz on ${this.currentSectionTitle} and scored ${this.score}/${this.currentQuestions.length}.`);
    return `mailto:?subject=${subject}&body=${body}`;
  }

  whatsappShareUrl() {
    const text = encodeURIComponent(`I scored ${this.score}/${this.currentQuestions.length} on ${this.currentSectionTitle} at Saraswati Vidya Peetam Quiz.`);
    return `https://wa.me/918790961756?text=${text}`;
  }
}
